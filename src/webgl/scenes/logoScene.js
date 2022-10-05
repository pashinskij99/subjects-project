import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { isMobile } from '../../scripts/utils';
import gsap from 'gsap';

const sizes = {
    width: window.innerWidth * 1.5,
    height: window.innerHeight * 1.5,
};
class Scene {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        20,
        (sizes.width * 1.5) / (sizes.height * 1.5),
        0.1,
        1000
    );
    renderer = new THREE.WebGLRenderer({ antialias: true });
    fbxLoader = new FBXLoader()
    modelMesh;
    staticCameraPosition;
    slideIndex;
    scrollModifier;
    scrollModifierNew = -1;
    modelName;
    modelPosition;
    rect;

    constructor(
        domElement,
        slideIndex,
        modelName,
        cameraPosition,
        modelPosition,
        modelColor,
        rotationModifier
    ) {
        if (!domElement) {
            return;
        }
        this.rotationModifier = rotationModifier;
        this.scrollModifier = slideIndex;
        this.renderer.setSize(sizes.width, sizes.height);
        this.renderer.setClearColor(0xffffff, 0);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.BasicShadowMap;
        domElement?.appendChild(this.renderer.domElement);
        this.slideIndex = +slideIndex;
        this.staticCameraPosition = cameraPosition;
        this.camera.position.set(
            cameraPosition[0],
            cameraPosition[1],
            cameraPosition[2]
        );
        this.modelName = modelName;
        if (modelColor) this.modelColor = modelColor;
        this.modelPosition = modelPosition;
        this.resize();
        this.init();

        this.rect = domElement.getBoundingClientRect();

        this.animate()
        // this.wheel()

        window.addEventListener('scroll', () => {
            let scrollY = window.scrollY;
            this.scrollModifier =
                scrollY / (this.rect.top - this.rect.height / 2);
            this.scrollModifierNew =
                ((scrollY - this.rect.top) / this.rect.height) * 2 - 0.5;
        });

        if (window.history.scrollRestoration) {
            window.history.scrollRestoration = 'manual';
        } else {
            window.onbeforeunload = function () {
                window.scrollTo(0, 0);
            };
        }

        // setInterval(() => {
        //     this.onResize();
        // }, 100);
    }

    resize() {
        window.addEventListener('resize', () => {
            this.onResize();
        });
    }

    // wheel = () => {
    //     window.addEventListener('wheel', () => {
    //         this.rotateObjects()
    //     })
    // }

    onResize = () => {
        sizes.width = window.innerWidth;
        this.camera.aspect = sizes.width / sizes.height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(sizes.width, sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    };

    loadModels = () => {
        const modelUrl = require(`../models/${this.modelName}`);
        const modelScale = isMobile ? .9 : 1.9
        this.fbxLoader.load(modelUrl, (model) => {
            model.position.set(
                this.modelPosition[0],
                this.modelPosition[1],
                this.modelPosition[2]
            );
            model.children[0].traverse((child) => {
                if (child.isMesh) {
                    if (this.modelName === 'logo.fbx') {
                        child.material.roughness = 0.9;
                        this.addLogoLights();
                    }
                }
            });

            model.scale.set(modelScale, modelScale, modelScale);
            // gsap.to(model.children[0].rotation, {
            //     y: -300,
            //     z: 6.6
            // });
            this.scene.add(model);
            this.modelMesh = model;
            // const cubeGeometry = new THREE.BoxBufferGeometry(20, 20)
            // const cubeMaterial = new THREE.MeshBasicMaterial(0xffff00)
            // const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
            // cubeMesh.scale.set(30, 30, 30)
            // this.scene.add(cubeMesh);
            // this.modelMesh = cubeMesh;
        });
    };

    rotateObjects = () => {
        if (this.modelMesh) {
            this.modelMesh.rotation.y = this.modelPosition[1] +
            (this.scrollModifier - this.slideIndex) *
                this.rotationModifier.y + 1

            this.modelMesh.children[0].position.y = this.scrollModifierNew * 0.1
        }
    };

    addLogoLights = () => {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
        this.scene.add(ambientLight);
        const light1 = new THREE.DirectionalLight(0xa5a5a5, 0.5);
        light1.position.set(-100, 800, 60);
        this.scene.add(light1);
        const light2 = new THREE.DirectionalLight(0xa5a5a5, 0.5);
        light2.position.set(10, -200, -20);
        this.scene.add(light2);
        // const light3 = new THREE.DirectionalLight(0xa5a5a5, 0.3);
        // light3.position.set(300, 0, 100);
        // this.scene.add(light3);
        // const light4 = new THREE.DirectionalLight(0xa5a5a5, 0.3);
        // light4.position.set(40, 200, 50);
        // this.scene.add(light4);
    };

    animate = () => {
        requestAnimationFrame(this.animate);
        if (this.modelMesh)
            if (isMobile) {
                this.camera.lookAt(
                  this.modelMesh.position.x,
                  this.modelMesh.position.y,
                  this.modelMesh.position.z + 15
                );
            } else {
                this.camera.lookAt(
                  this.modelMesh.position.x,
                  this.modelMesh.position.y,
                  this.modelMesh.position.z
                );
            }
        this.rotateObjects()
        this.renderer.render(this.scene, this.camera);
    };

    init() {
        this.loadModels();
    }
}

export { Scene };
