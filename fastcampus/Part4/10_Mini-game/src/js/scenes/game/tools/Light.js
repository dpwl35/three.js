import * as THREE from "three";

export class Light extends THREE.DirectionalLight {
    constructor() {
        super(0xfffffff);
        this.position.set(0, 5, 0);
        this.castShadow = true;
        //그림자 선명하게
        this.shadow.mapSize.width  = 2048; 
        this.shadow.mapSize.height  = 2048;
    }

    update({ position }) { //타겟지정
        this.position.set(position.x, 5, position.z);
        //this.target.position.set(0, 3, position.z);
        this.target.position.set(position.x, 3, position.z); //그림자 고정 
    }
}