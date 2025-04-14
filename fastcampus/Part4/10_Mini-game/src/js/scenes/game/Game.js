import * as THREE from "three";
import { SWorld } from "../../core/World";
import { Floor } from '../game/models/Floor.js'
import { Light } from '../game/tools/Light.js';

export class Game {
    constructor() {
        this.world = SWorld;
        this.scene = new THREE.Scene(); //물체를 렌더러 하기 위한 scene
        this.world.currentScene = this.scene;

       this.addModels();
    }

    addModels() {
        this.floor = new Floor(4, 1, 4, {x: 0, y: 0, z: 0});
        this.light = new Light();

        this.scene.add(this.floor, this.light);
    }

    play() {
        this.world.update();
    
        window.requestAnimationFrame(() => {
          this.play();
        })
      }
}