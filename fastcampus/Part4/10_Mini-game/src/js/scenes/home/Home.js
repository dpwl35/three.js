import * as THREE from "three";
import { SWorld } from "../../core/World.js";
import { SPhasics } from "../../core/Physics.js";
import { Floor } from '../home/models/Floor.js';
import { Light } from '../home/tools/Light.js';
import { SEventEmitter } from "../../utils/EventEmitter3.js";
import { Bird } from "./models/Bird.js";

export class Home {

  async init() {
      this.world = SWorld;
      this.scene = new THREE.Scene();
      this.world.currentScene = this.scene;

      this.physics = SPhasics;
      this.eventEmitter = SEventEmitter; 

      await this.addModels();
    }

    async addModels() { 
        this.floor = new Floor(20, 1, 20, { x: 0, y: 0, z: 0 });
        this.light = new Light();

        this.scene.add(this.floor, this.light);

        await this.addGLTFModels();
        
        this.models = this.scene.children.filter((child) => child);
        this.physics.add(
          ...this.models.map((model) => model.body).filter((v) => !!v)
        );
    }

    async addGLTFModels() {
      this.bird = new Bird();
      await this.bird.init(3, { x: 0, y: 2, z: 0 });
      this.scene.add(this.bird.instance_);
    }

    play() {
        this.world.update(this.player);
        this.physics.update(...this.models);
    
        window.requestAnimationFrame(() => {
          this.play();
        })
    }
}