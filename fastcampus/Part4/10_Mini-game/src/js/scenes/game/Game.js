import * as THREE from "three";
import { SWorld } from "../../core/World";
import { SPhasics } from "../../core/Physics.js";
import { Floor } from '../game/models/Floor.js';
import { Player } from '../game/models/Player.js';
import { Light } from '../game/tools/Light.js';

export class Game {
    constructor() {
        this.world = SWorld;
        this.scene = new THREE.Scene(); //물체를 렌더러 하기 위한 scene
        this.world.currentScene = this.scene;

        this.physics = SPhasics;

       this.addModels();
    }

    addModels() {
        this.player = new Player(0.3, { x: 0, y: 2, z: 0 });      
        this.floor = new Floor(4, 1, 4, { x: 0, y: 0, z: 0 });
        this.light = new Light();

        this.scene.add(this.player, this.floor, this.light);
        this.physics.add(this.player.body, this.floor.body);
    }

    play() {
        this.world.update();
        this.physics.update(this.player, this.floor);
    
        window.requestAnimationFrame(() => {
          this.play();
        })
      }
}