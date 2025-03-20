import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function () {
  const renderer = new THREE.WebGLRenderer({
    //렌더러 객체 생성
    alpha: true,
  });

  const container = document.querySelector("#container");

  container.appendChild(renderer.domElement);
  //렌더러 객체 안에는 캔버스 el 정보가 담겨있는 domElement가 있다.

  const canvasSize = {
    //윈도우창 넓이 = 캔버스 사이즈
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const scene = new THREE.Scene(); //물체를 렌더러 하기위한 씬
  const camera = new THREE.PerspectiveCamera( //카메라 객체
    75,
    canvasSize.width / canvasSize.height, //카메라의 종횡비 값
    0.1,
    100
  );
  camera.position.set(0, 0, 3);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;

  const createObject = () => {
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const geometry = new THREE.PlaneGeometry(1, 1);
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);
  };

  const resize = () => {
    canvasSize.width = window.innerWidth;
    canvasSize.height = window.innerHeight;

    camera.aspect = canvasSize.width / canvasSize.height;
    camera.updateProjectionMatrix();

    renderer.setSize(canvasSize.width, canvasSize.height); //렌더러 사이즈 = 윈도우창 사이즈
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); //픽셀비율도 알맞게 지정
  };

  const addEvent = () => {
    window.addEventListener("resize", resize);
  };

  const draw = () => {
    controls.update();
    renderer.render(scene, camera); //렌더러에 넘겨줌
    requestAnimationFrame(() => {
      draw(); //매프레임마다 실행
    });
  };

  const initialize = () => {
    createObject();
    addEvent();
    resize();
    draw();
  };

  initialize();
}
