import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { isMobile } from '../../scripts/utils';
import gsap from 'gsap';

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};
class Scene {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        9,
        sizes.width / sizes.height,
        0.6,
        1000
    );
    cursor = {
        x: null,
        y: null,
    };
    renderer = new THREE.WebGLRenderer({ antialias: true });
    directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.6);
    ambientLight = new THREE.AmbientLight(0xf2f2eb, 0.9);
    loader = new GLTFLoader();
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
    theme = 'dark';
    groundMesh;
    startX = 0;
    oldX = 0;
    appElement;
    focus = false;
    isLanding = false;

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
        isLanding
    ) {
        if (!domElement) {
            return;
        }
        this.appElement = document.querySelector('.App');
        if (cameraModifier) this.cameraModifier = cameraModifier;
        if (isLanding) this.isLanding = isLanding;
        this.rotationModifier = rotationModifier;
        this.scrollModifier = slideIndex;
        this.renderer.setSize(sizes.width, sizes.height);
        this.renderer.setClearColor(0xffffff, 0);
        this.renderer.gammaOutput = true;
        this.renderer.gammaFactor = 2.2;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        domElement?.appendChild(this.renderer.domElement);
        this.directionalLight.castShadow = true;
        this.directionalLight2.castShadow = false;
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
        this.directionalLight3.position.set(-20, -10, 100);
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

        // setInterval(() => {
        //     this.onResize();
        // }, 100);
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
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    };

    addDesktopControls() {
        window.addEventListener('mousemove', (e) => {
            if (e.target.id === 'slide-6') {
                this.cursor.x = e.pageX / sizes.width - 0.5;
            }
            else this.cursor.x = (e.pageX / sizes.width - 0.5) * 2.2;
        });
    }

    addMobileControls() {
        window.addEventListener('touchstart', (e) => {
            this.focus = e.touches[0].target.id === 'slide-6' || this.isLanding;
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
        this.loader.load(modelUrl, (gltf) => {
            if (this.isLanding && isMobile)
                gltf.scene.position.set(
                    this.modelPosition[0],
                    this.modelPosition[0] - 30,
                    this.modelPosition[2]
                );
            else if (isMobile)
                gltf.scene.position.set(
                  this.modelPosition[0],
                  this.modelPosition[0] - 30,
                  this.modelPosition[2]
                );
            else
                gltf.scene.position.set(
                    this.modelPosition[0],
                    this.modelPosition[1] + 50,
                    this.modelPosition[2]
                );
            if (isMobile && this.isLanding) gltf.scene.scale.set(10, 10, 10);
            else if (isMobile) gltf.scene.scale.set(10, 10, 10);
            else gltf.scene.scale.set(15, 15, 15);
            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    if (child.name === 'SM_Ground_01') {
                        child.material.transparent = true;
                        child.material.roughness = 1;
                        child.material.opacity = 0;
                        if (this.isLanding) {
                            const alphaMapUrl = require(`../textures/groundAlphaMap.png`);
                            new THREE.TextureLoader().load(
                                alphaMapUrl,
                                (alphaMap) => {
                                    child.material.alphaMap = alphaMap;
                                    child.material.opacity = 0.9;
                                    child.material.color.set('#2D3033');
                                }
                            );
                            this.groundMesh = child;
                        } else {
                            const alphaMapUrl = require(`../textures/groundAlphaMap.png`);
                            new THREE.TextureLoader().load(
                                alphaMapUrl,
                                (alphaMap) => {
                                    child.material.alphaMap = alphaMap;
                                    child.material.opacity = 1;
                                }
                            );
                            child.material.color.set('#C4C4C2');
                            this.groundMesh = child;
                        }
                    }
                    if (child.name === 'SM_Drape_01') {
                        child.castShadow = true;
                        child.material.color.set(this.clothColor);
                        child.material.roughness = 0.9;
                        child.material.metalness = 0.4;
                    }
                    if (child.name === 'SM_Thing_01') {
                        child.castShadow = true;
                        child.material.color.set(this.modelColor);
                        child.material.roughness = 0.9;
                        child.material.metalness = 0.4;
                    }
                }
            });
            // const cubeGeometry = new THREE.BoxBufferGeometry(10, 10)
            // const cubeMaterial = new THREE.MeshBasicMaterial(0xffff00)
            // const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
            this.scene.add(gltf.scene);
            // this.scene.add(cubeMesh);
            this.modelMesh = gltf.scene;
            // this.modelMesh = cubeMesh;
        });
    };

    updateCameraControls() {
        const x =
            Math.sin(this.cursor.x * Math.PI * 2) * this.cameraModifier.lon;
        const z =
            Math.cos(this.cursor.x * Math.PI * 2) * this.cameraModifier.lon;
        this.camera.position.set(x, this.camera.position.y, z);
        if (this.modelMesh) {
            if (this.isLanding && !isMobile) {
                this.camera.lookAt(
                    this.modelMesh.position.x,
                    this.modelMesh.position.y + 10,
                    this.modelMesh.position.z
                );
            } else if (this.isLanding && isMobile) {
                this.camera.lookAt(
                    this.modelMesh.position.x,
                    this.modelMesh.position.y + 63,
                    this.modelMesh.position.z
                );
            } else if (isMobile)
                this.camera.lookAt(
                    this.modelMesh.position.x,
                    this.modelMesh.position.y + 7,
                    this.modelMesh.position.z
                );
            else if (!isMobile)
                this.camera.lookAt(
                    this.modelMesh.position.x,
                    this.modelMesh.position.y + 10,
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
