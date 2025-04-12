import * as THREE from "three";
import * as CANNON from "cannon-es";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { SWorld } from './core/World.js';
import { Game } from './scenes/game/Game.js'

export default function () {
  const game = new Game();


  const initialize = () => {
    game.play();
  }

  initialize();
}
