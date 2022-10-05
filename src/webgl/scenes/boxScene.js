import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { isMobile } from '../../scripts/utils';
import gsap from 'gsap';

let params = new URLSearchParams(window.location.search);
// const quality = params.get('quality')

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

class Scene {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    .5,
    1200
  );
  cursor = {
    x: null,
    y: null,
  };
  renderer = new THREE.WebGLRenderer({ antialias: true });
  directionalLight = new THREE.DirectionalLight('#ffffff', 0.8);
  directionalLight2 = new THREE.DirectionalLight("#ffffff", 0.8);
  ambientLight = new THREE.AmbientLight(0xf2f2eb, 0.5);
  fbxLoader = new FBXLoader();
  modelMesh;
  controls;
  staticCameraPosition;
  slideIndex;
  scrollModifier;
  cameraModifier = {
    lon: 300,
    lat: 200,
  };
  modelName;
  modelPosition;
  rect;
  startX = 0;
  oldX = 0;
  appElement;
  focus = false;

  constructor(
    domElement,
    slideIndex,
    modelName,
    cameraPosition,
    modelPosition,
    lightPosition,
    modelColor,
    clothColor,
    rotationModifier,
    cameraModifier,
  ) {
    if (!domElement) {
      return;
    }
    this.appElement = document.querySelector('.App');
    if (cameraModifier) this.cameraModifier = cameraModifier;
    this.rotationModifier = rotationModifier;
    this.scrollModifier = slideIndex;
    this.renderer.setSize(sizes.width, sizes.height);
    this.renderer.setClearColor(0xffffff, 0);
    this.renderer.gammaOutput = true;
    this.renderer.gammaFactor = 2.2;
    this.renderer.shadowMap.enabled = true;
    domElement?.appendChild(this.renderer.domElement);
    this.scene.add(this.ambientLight);
    this.controls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    this.slideIndex = +slideIndex;
    this.staticCameraPosition = cameraPosition;
    if (isMobile)
      this.camera.position.set(
        cameraPosition[0],
        cameraPosition[1] - 80,
        cameraPosition[2]
      );
    else
      this.camera.position.set(
        cameraPosition[0],
        cameraPosition[1],
        cameraPosition[2]
      );
    if (lightPosition)
      this.directionalLight.position.set(
        lightPosition[0],
        lightPosition[1],
        lightPosition[2]
      );
    else this.directionalLight.position.set(100, 100, -100);
    this.directionalLight2.position.set(-200, 30, -200);
    this.controls.enabled = false;
    this.controls.enableZoom = false;
    this.controls.update();
    this.modelName = modelName;
    if (modelColor) this.modelColor = modelColor;
    if (clothColor) this.clothColor = clothColor;
    this.modelPosition = modelPosition;
    this.resize();
    this.init();

    this.rect = domElement.getBoundingClientRect();

    this.animate();

    window.addEventListener('scroll', () => {
      let scrollY = window.scrollY;
      this.scrollModifier =
        scrollY / (this.rect.top - this.rect.height / 2);
    });

    if (isMobile) {
      this.addMobileControls();
    } else this.addDesktopControls();
  }

  resize() {
    window.addEventListener('resize', () => {
      this.onResize();
    });
  }

  onResize = () => {
    sizes.width = window.innerWidth;
    this.camera.aspect = sizes.width / sizes.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(sizes.width, sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  addDesktopControls() {
    window.addEventListener('mousemove', (e) => {
      if (e.target.id === 'slide-3') {
        this.cursor.x = e.pageX / sizes.width - 0.5;
      }
      else this.cursor.x = (e.pageX / sizes.width - 0.5) * 2.2;
    });
  }

  addMobileControls() {
    window.addEventListener('touchstart', (e) => {
      this.focus = e.touches[0].target.id === 'slide-3';
      this.startX = e.touches[0].pageX / sizes.width - 0.5;
    });
    window.addEventListener('touchmove', (e) => {
      if (e.touches && this.focus) {
        this.cursor.x =
          e.touches[0].pageX / sizes.width -
          0.5 -
          this.startX +
          this.oldX;
      }
    });
    window.addEventListener('touchend', (e) => {
      if (this.focus) this.oldX = this.cursor.x;
    });
  }

  loadModels = () => {
    const modelUrl = require(`../models/${this.modelName}`);
    const modelTexture = require(`../textures/texture_box.jpg`)
    const texture = new THREE.TextureLoader().load( modelTexture );

    const scaleModal = isMobile ? 5 : 1.5
    this.fbxLoader.load(modelUrl, (model) => {
      console.log(model)
      model.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material.map = texture
          child.material.needsUpdate = true;
        }
      });
      if (isMobile)
        model.position.set(
          this.modelPosition[0],
          this.modelPosition[1] + 100,
          this.modelPosition[2]
        )
      else
        model.position.set(
          this.modelPosition[0],
          this.modelPosition[1],
          this.modelPosition[2]
        );

      model.children[0].scale.set(scaleModal, scaleModal, scaleModal);
      gsap.to(model.children[0].rotation, {
        y: -300,
        z: 6.6
      });
      this.scene.add(model);
      this.modelMesh = model;
    });
  };

  updateCameraControls() {
    const x =
      Math.sin(this.cursor.x * Math.PI * 2) * this.cameraModifier.lon;
    const z =
      Math.cos(this.cursor.x * Math.PI * 2) * this.cameraModifier.lon;
    this.camera.position.set(x, this.camera.position.y, z);
    if (this.modelMesh) {
      if (isMobile)
        this.camera.lookAt(
          this.modelMesh.position.x,
          this.modelMesh.position.y + 67,
          this.modelMesh.position.z
        );
      else if (!isMobile)
        this.camera.lookAt(
          this.modelMesh.position.x,
          this.modelMesh.position.y,
          this.modelMesh.position.z
        );
    }
  }

  rotateObjects = () => {
    if (this.modelMesh) {
      this.modelMesh.rotation.y = this.modelPosition[1] +
      (this.scrollModifier - this.slideIndex) *
      this.rotationModifier.y
    }
  };

  animate = () => {
    requestAnimationFrame(this.animate);
    this.updateCameraControls();
    this.rotateObjects();
    this.renderer.render(this.scene, this.camera);
  };

  init() {
    this.loadModels();
    this.scene.add(this.ambientLight);
    this.scene.add(this.directionalLight);
    this.scene.add(this.directionalLight2);
  }
}

export { Scene };
