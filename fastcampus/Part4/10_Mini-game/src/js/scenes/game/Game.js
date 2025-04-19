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
        this.floor1 = new Floor(5, 1, 20, { x: 0, y: 0, z: 0 });
        this.floor2 = new Floor(5, 1, 15, { x: 0, y: 0, z: -20 });
        this.floor3 = new Floor(5, 1, 7, { x: 0, y: 0, z: -35 });
        this.light = new Light();

        this.scene.add( 
          this.player, 
          this.floor1, 
          this.floor2, 
          this.floor3, 
          this.light,
          this.light.target,

          new THREE.CameraHelper(this.light.shadow.camera)
        );

        this.physics.add(
          this.player.body, 
          this.floor1.body, 
          this.floor2.body, 
          this.floor3.body
        );
    }

    play() {
        this.world.update(this.player);
        this.light.update(this.world.camera);
        this.physics.update(this.player, this.floor1, this.floor2,  this.floor3);
    
        window.requestAnimationFrame(() => {
          this.play();
        })
      }
}