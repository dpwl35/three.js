import * as THREE from "three";

export class Renderer extends THREE.WebGLRenderer {
    get sizer() {
        return this.world.sizer;
    }

    get camera() {
        return this.world.camera;
    }

    get currentScene() {
        return this.world.currentScene;
    }

    constructor(world) {
        super({ 
            alpha: true, 
            antialias: true,
            canvas: world.domElement 
        });
        this.world = world; // World 인스턴스 저장
        this.setClearColor(0x333333, 1);
        this.setSize(this.sizer.width, this.sizer.height);
        this.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    resize() {
        this.setSize(this.sizer.width, this.sizer.height);
        this.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    update() {
        //renderer.render(scene, camera);
        if (this.currentScene && this.camera) {
            this.render(this.currentScene, this.camera)
        }
    }
}