import * as THREE from "three";
import * as CANNON from "cannon-es";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { SWorld } from './core/World.js';
import { Game } from './scenes/game/Game.js';
import { Home } from './scenes/home/Home.js';
import { SEventEmitter } from "./utils/EventEmitter3.js";

export default async function () {
  const game = new Game();
  const home = new Home();

  const eventEmitter = SEventEmitter;

  eventEmitter.onchangeScene(async scene => {
    console.log(scene);
    
    switch(scene) {
      case 'game': {
        home.dispose();
        game.init();
        game.play();
        break;
      }
      case 'home': {
        game.dispose();
        await home.init();
        home.play();
        break;
      }
    }
  })

  const initialize = () => {
    eventEmitter.changeScene('home');
  }

  initialize();
}
