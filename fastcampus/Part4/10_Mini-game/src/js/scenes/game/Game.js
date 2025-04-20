import * as THREE from "three";
import { SWorld } from "../../core/World";
import { SPhasics } from "../../core/Physics.js";
import { Floor } from '../game/models/Floor.js';
import { Player } from '../game/models/Player.js';
import { Barricade  } from "./models/Barricade.js";
import { Roller } from "./models/Roller.js";
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
        this.player = new Player(0.3, { x: 0, y: 3, z: 9 });      
        this.floor1 = new Floor(5, 1, 20, { x: 0, y: 0, z: 0 });
        this.floor2 = new Floor(5, 1, 15, { x: 0, y: 0, z: -20 });
        this.floor3 = new Floor(5, 1, 7, { x: 0, y: 0, z: -35 });
        this.barricade1 = new Barricade(1.5, 1.5, 0.5, { x: -1.5, y: 1.4, z: 3});
        this.barricade2 = new Barricade(1.5, 1.5, 0.5, { x: 2, y: 1.4, z: -2 });
        this.roller = new Roller(0.3, 0.3, 4, { x: 0, y: 1, z: -17 });
        this.light = new Light();

        this.scene.add( 
          this.player, 
          this.floor1, 
          this.floor2, 
          this.floor3, 
          this.light,
          this.light.target,
          this.barricade1,
          this.barricade2,
          this.roller,

          new THREE.CameraHelper(this.light.shadow.camera)
        );

        this.physics.add(
          this.player.body, 
          this.floor1.body, 
          this.floor2.body, 
          this.floor3.body,
          this.barricade1.body,
          this.barricade2.body,
          this.roller.body
        );
    }

    play() {
        this.world.update(this.player);
        this.light.update(this.world.camera);
        this.physics.update(
          this.player, 
          this.floor1, 
          this.floor2,  
          this.floor3,
          this.barricade1, 
          this.barricade2, 
          this.roller
        );
    
        window.requestAnimationFrame(() => {
          this.play();
        })
      }
}