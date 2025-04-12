import * as THREE from "three";

export class Light extends THREE.DirectionalLight {
    constructor() {
        super(0xfffffff);
        this.position.set(0, 3, 0);
        this.castShadow = true;
    }
}