import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GUI } from "lil-gui";

window.addEventListener("load", function () {
  init();
});

async function init() {
  gsap.registerPlugin(ScrollTrigger);

  const params = {
    waveColor: "#00ffff",
    backgroundColor: "#ffffff",
    fogColor: "#f0f0f0",
  };

  const canvas = document.querySelector("#canvas");

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas,
  });

  //그림자
  renderer.shadowMap.enabled = true;

  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();

  //안개
  scene.fog = new THREE.Fog(0xf0f0f0, 0.1, 500);

  //카메라
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500
  );
  camera.position.set(0, 25, 150);

  //파도
  const waveGeometry = new THREE.PlaneGeometry(1500, 1500, 150, 150);
  const waveMaterial = new THREE.MeshStandardMaterial({
    //wireframe: true,
    color: params.waveColor,
  });

  const wave = new THREE.Mesh(waveGeometry, waveMaterial);
  wave.rotation.x = -Math.PI / 2;
  wave.receiveShadow = true;

  const waveHeight = 2.5;
  const initialZPositions = []; //초기 z값 배열

  for (let i = 0; i < waveGeometry.attributes.position.count; i++) {
    const z =
      waveGeometry.attributes.position.getZ(i) +
      (Math.random() - 0.5) * waveHeight;

    waveGeometry.attributes.position.setZ(i, z);
    initialZPositions.push(z);
  }

  //웨이브
  wave.update = function () {
    const elapsedTime = clock.getElapsedTime();
    //각 정점의 z좌표값 변경
    for (let i = 0; i < waveGeometry.attributes.position.count; i++) {
      //각 정점 값 다르게
      const z =
        initialZPositions[i] + Math.sin(elapsedTime * 3 + i ** 2) * waveHeight;
      waveGeometry.attributes.position.setZ(i, z);
    }
    waveGeometry.attributes.position.needsUpdate = true;
  };
  scene.add(wave);

  //배 파일 불러오기
  const gltfLoader = new GLTFLoader();
  const gltf = await gltfLoader.loadAsync("./models/ship/scene.gltf");
  //console.log(gltf);
  const ship = gltf.scene; //보통 scene에 모델이 들어가있음

  ship.castShadow = true; //배 그림자

  ship.traverse((object) => {
    if (object.isMesh) {
      //Mesh 오브젝트의 쉐도우 트루
      object.castShadow = true;
    }
  });

  ship.update = function () {
    const elapsedTime = clock.getElapsedTime();

    ship.position.y = Math.sin(elapsedTime * 3);
  };

  ship.rotation.y = Math.PI; //각도
  ship.scale.set(40, 40, 40); //크기
  scene.add(ship); //씬에 추가

  //라이트
  const pointLight = new THREE.PointLight(0xffffff, 1);

  pointLight.castShadow = true; //그림자 관련 설정
  pointLight.shadow.mapSize.width = 1024;
  pointLight.shadow.mapSize.height = 1024;
  pointLight.shadow.radius = 10;

  pointLight.position.set(15, 15, 15);
  scene.add(pointLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);

  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.radius = 10;

  directionalLight.position.set(-15, 15, 15);

  scene.add(directionalLight);

  const clock = new THREE.Clock();

  //-------------------

  render();

  function render() {
    wave.update();
    ship.update();
    //카메라가 항상 배를 보고있게
    camera.lookAt(ship.position);

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.render(scene, camera);
  }

  window.addEventListener("resize", handleResize);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".wrapper",
      start: "top top",
      end: "bottom bottom",
      scrub: true, //스크롤 높이만큼 처음 색에서 #4268ff 이색으로 그라데이션 됨
      // markers: true,
    },
  });

  tl.to(params, {
    //바다색변경
    waveColor: "#4268ff",
    onUpdate: () => {
      waveMaterial.color = new THREE.Color(params.waveColor);
    },
    duration: 1.5,
  })
    .to(
      //백그라운드변경
      params,
      {
        backgroundColor: "#2a2a2a",
        onUpdate: () => {
          scene.background = new THREE.Color(params.backgroundColor);
        },
        duration: 1.5,
      },
      "<"
    )
    .to(
      //안개변경
      params,
      {
        fogColor: "#2f2f2f",
        onUpdate: () => {
          scene.fog.color = new THREE.Color(params.fogColor);
        },
        duration: 1.5,
      },
      "<"
    )
    .to(camera.position, {
      x: 100,
      z: -50,
      duration: 2.5,
    })
    .to(ship.position, {
      z: 150,
      duration: 2,
    })
    .to(camera.position, {
      x: -50,
      y: 25,
      z: 100,
      duration: 2,
    })
    .to(camera.position, {
      x: 0,
      y: 50,
      z: 300,
      duration: 2,
    });

  gsap.to(".title", {
    opacity: 0,
    scrollTrigger: {
      trigger: ".wrapper",
      scrub: true,
      pin: true,
      end: "+=1000",
    },
  });
}
