import * as THREE from "three";
import * as CANNON from "cannon-es";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { SWorld } from './core/World.js';
import { Game } from './scenes/game/Game.js';
import { Home } from './scenes/home/Home.js';

export default async function () {
  const home = new Home();
  await home.init();


  const initialize = () => {
    home.play();
  }

  initialize();
}
