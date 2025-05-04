import * as THREE from "three";
import { Sizer } from '../utils/Sizer.js'
import { Camera } from '../utils/Camera.js'
import { Renderer } from '../utils/Renderer.js'
import { SEventEmitter } from '../utils/EventEmitter3.js'

export class World {
    currentScene_ = null;
    get currentScene() { return this.currentScene_ };
    set currentScene(scene) { this.currentScene_ = scene };
    
    constructor(canvasEl) {
        this.domElement = canvasEl; //#canvas
        this.eventEmitter = SEventEmitter;

        this.sizer = new Sizer(); // 사이즈 설정 
        this.camera = new Camera(this); //THREE Camera 설정 
        this.renderer = new Renderer(this); //THREE.WebGLRenderer

        this.eventEmitter.onResize(() => this.resize());
        // console.log('씬 안에 있는 객체들:', this.scene.children);
    }

    resize() {
        this.camera.resize();
        this.renderer.resize();
    }

    update(player, mode) {
        this.camera.update(player, mode);
        this.renderer.update();
    }


}

export const SWorld = new World(document.querySelector('#canvas'));