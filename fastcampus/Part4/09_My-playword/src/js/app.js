import * as THREE from "three";
import * as CANNON from "cannon-es";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function () {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
  });
  renderer.setClearColor(0x333333, 1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const container = document.querySelector("#container");

  container.appendChild(renderer.domElement);

  const canvasSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const scene = new THREE.Scene(); 
  const camera = new THREE.PerspectiveCamera( 
    75,
    canvasSize.width / canvasSize.height, 
    0.1,
    100
  );
  camera.position.set(5, 7, 5);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;

  /* 물리공간 월드객체 만들기*/
  const world = new CANNON.World();
  world.broadphase = new CANNON.SAPBroadphase(world); //충돌
  world.gravity.set(0, -9.82, 0); //중력
  world.allowSleep = true; //정지된 물체는 충돌검사 x  퍼포먼스를 높이는데 사용

  const worldObjects = [];

  const floorMaterial = new CANNON.Material('floor');
  const sphereMaterial = new CANNON.Material('sphere');
  const contactMaterial = new CANNON.ContactMaterial(floorMaterial, sphereMaterial, {
    friction: 0.1,
    restitution: 0.5
  });
  world.addContactMaterial(contactMaterial);

  /* 조명 */
  const createLight = () => {
    const light = new THREE.DirectionalLight(0xffffff);
    light.castShadow = true;
    light.position.set(0, 10, 0);

    scene.add(light);
  }

  /* 바닥 */
  const createFloor = () => {
    const geometry = new THREE.BoxGeometry(6, 1, 6); // 가로, 세로, 깊이 
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff }); //빛/그림자 반응 O
    const mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true; //다른 물체의 그림자를 받음

    scene.add(mesh);

    const shape = new CANNON.Box(new CANNON.Vec3(6 / 2, 1 / 2, 6 / 2)); //geometry 크기의 절반 
    const body = new CANNON.Body({
      mass: 0, // 바닥은 정적인 물체니까 질량 0으로 고정  
      shape: shape,
      material: floorMaterial
    });

    world.addBody(body);
    worldObjects.push({mesh, body});
  };

  /* 공 */
  const createSphere = () => {
    const material = new THREE.MeshStandardMaterial({ color: 0xeeeeee });
    const geometry = new THREE.SphereGeometry(0.3, 30, 30);
    const mesh = new THREE.Mesh(geometry, material);

    mesh.castShadow = true; 
    mesh.receiveShadow = false;

    scene.add(mesh);

    const shape = new CANNON.Sphere(0.3);

    const body = new CANNON.Body({
      mass: 1,
      shape,
      material: sphereMaterial
    });
    body.position.y = 5;
    body.name = 'sphere';
    world.addBody(body);

    worldObjects.push({mesh, body});
  }


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

    renderer.setSize(canvasSize.width, canvasSize.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  const addEvent = () => {
    window.addEventListener("resize", resize);
  };

  const draw = () => {
    controls.update();
    renderer.render(scene, camera); 
    world.step( 1 / 60 ); //60분의 1 프레임 

    worldObjects.forEach(worldObjects => {
      if (worldObjects.body.name === 'sphere') {
        worldObjects.body.applyImpulse(
          new CANNON.Vec3(0.01, 0, 0), 
          worldObjects.body.position
        );
      }
      
      //Three.js의 mesh가 Cannon.js의 body를 따라가도록 실시간 위치/회전 정보를 복사해주는 필수 동기화
      worldObjects.mesh.position.copy(worldObjects.body.position); 
      worldObjects.mesh.quaternion.copy(worldObjects.body.quaternion);
    })

    requestAnimationFrame(() => {
      draw();
    });
  };

  const initialize = () => {
    createLight();
    createFloor();
    createObject();
    createSphere();
    addEvent();
    resize();
    draw();
  };

  initialize();
}
