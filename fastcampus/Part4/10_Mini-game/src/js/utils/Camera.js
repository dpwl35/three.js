import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class Camera extends THREE.PerspectiveCamera {

    get sizer() {
        return this.world.sizer;
    }

    constructor(world) {
        super(75, world.sizer.width / world.sizer.height, 0.1, 100);
        this.world = world; // World 인스턴스 저장
        this.domElement = this.world.domElement; //OrbitControls가 조작할 대상인 <canvas>
        this.position.set(0, 2, 5);

        this.addControls();
    }

    addControls() {
        this.controls = new OrbitControls(this, this.domElement);
        this.controls.enabled = true;
        this.controls.enableDamping = true;
    }

    resize() {
        this.aspect = this.sizer.width / this.sizer.height;
        this.updateProjectionMatrix();
    }

    update() {
        this.controls.update();
    }
}