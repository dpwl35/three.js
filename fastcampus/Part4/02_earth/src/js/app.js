import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { positionLocal } from "three/examples/jsm/nodes/Nodes.js";
import { convertLatLngToPos, getGradientCanvas } from "./utils.js";

export default function () {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
  });
  renderer.outputEncoding = THREE.sRGBEncoding;

  //텍스처
  const textureLodader = new THREE.TextureLoader();
  const cubeTexuturLoader = new THREE.CubeTextureLoader();
  const environmentmap = cubeTexuturLoader.load([
    "assets/environments/px.png",
    "assets/environments/nx.png",
    "assets/environments/py.png",
    "assets/environments/ny.png",
    "assets/environments/pz.png",
    "assets/environments/nz.png",
  ]);

  environmentmap.encoding = THREE.sRGBEncoding;

  //초기 설정
  const container = document.querySelector("#container");
  container.appendChild(renderer.domElement);

  const canvasSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const scene = new THREE.Scene();
  scene.background = environmentmap;
  scene.environment = environmentmap;
  const camera = new THREE.PerspectiveCamera(
    75,
    canvasSize.width / canvasSize.height,
    0.1,
    100
  );
  camera.position.set(0, 0, 3);
  //카메라 컨트롤
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;

  //조명
  const addLight = () => {
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(2.65, 2.13, 1.02);
    scene.add(light);
  };

  //지구
  const createEarth1 = () => {
    const material = new THREE.MeshStandardMaterial({
      map: textureLodader.load("assets/earth-night-map.jpg"),
      // roughness: 0,
      // metalness: 0,
      opacity: 0.6,
      transparent: true, // 이거 넘겨줘야 투명도 반영됨
      side: THREE.FrontSide,
    });

    const geometry = new THREE.SphereGeometry(1.3, 30, 30);

    const mesh = new THREE.Mesh(geometry, material);

    mesh.rotation.y = -Math.PI / 2;

    return mesh;
  };

  //큰 지구
  const createEarth2 = () => {
    const material = new THREE.MeshStandardMaterial({
      map: textureLodader.load("assets/earth-night-map.jpg"),
      opacity: 0.9,
      transparent: true, // 이거 넘겨줘야 투명도 반영됨
      side: THREE.BackSide,
    });

    const geometry = new THREE.SphereGeometry(1.5, 30, 30);
    const mesh = new THREE.Mesh(geometry, material);

    mesh.rotation.y = -Math.PI / 2;

    return mesh;
  };

  //별
  const createStar = (count = 500) => {
    const positions = new Float32Array(count * 3); //x, y, z 별의 위치 32비트의 부동소수점 넘겨줄수있음

    for (let i = 0; i < count; i++) {
      positions[i] = (Math.random() - 0.5) * 5; //x = -3~3
      positions[i + 1] = (Math.random() - 0.5) * 5; //y
      positions[i + 2] = (Math.random() - 0.5) * 5; //z
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.01,
      transparent: true,
      depthWrite: false, //뒤에 있는 별도 렌더링
      map: textureLodader.load("assets/particle.png"),
      alphaMap: textureLodader.load("assets/particle.png"), // png 투명한 부분 검은색에서 투명으로 처리
      color: 0xbcc6c6,
    });

    const star = new THREE.Points(particleGeometry, particleMaterial);
    return star;
  };

  //좌표만들기 한국, 가나
  const createPoint1 = () => {
    const point = {
      lat: 37.56668 * (Math.PI / 180), //위도
      lng: 126.97841 * (Math.PI / 180), //경도
    };

    const position = convertLatLngToPos(point, 1.3);
    //지구 크기가 1.3이라 radius 값 넣어서 곱해줌

    const mesh = new THREE.Mesh(
      new THREE.TorusGeometry(0.02, 0.002, 20, 20),
      new THREE.MeshBasicMaterial({ color: 0x263d64 })
    );

    mesh.position.set(position.x, position.y, position.z);
    mesh.rotation.set(0.9, 2.46, 1);
    return mesh;
  };

  const createPoint2 = () => {
    const point = {
      lat: 5.55363 * (Math.PI / 180),
      lng: -0.196481 * (Math.PI / 180),
    };

    const position = convertLatLngToPos(point, 1.3);

    const mesh = new THREE.Mesh(
      new THREE.TorusGeometry(0.02, 0.002, 20, 20),
      new THREE.MeshBasicMaterial({ color: 0x263d64 })
    );

    mesh.position.set(position.x, position.y, position.z);
    return mesh;
  };

  //커브
  const createCurve = (pos1, pos2) => {
    const points = [];
    for (let i = 0; i <= 100; i++) {
      const pos = new THREE.Vector3().lerpVectors(pos1, pos2, i / 100);
      pos.normalize();

      const wave = Math.sin((Math.PI * i) / 100);

      pos.multiplyScalar(1.3 + 0.3 * wave);
      points.push(pos);
    }

    const curve = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.TubeGeometry(curve, 20, 0.003);

    const gradientCanvas = getGradientCanvas("#747f94", "#363d74");
    const texture = new THREE.CanvasTexture(gradientCanvas); //캔버스를  texture로 바꿔줌

    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);

    return mesh;
  };

  const create = () => {
    const earthGroup = new THREE.Group();
    const earth1 = createEarth1();
    const earth2 = createEarth2();
    const star = createStar();
    const point1 = createPoint1();
    const point2 = createPoint2();
    const curve = createCurve(point1.position, point2.position);

    earthGroup.add(earth1, earth2, point1, point2, curve);

    scene.add(earthGroup, star);

    return {
      earthGroup,
      star,
    };
  };

  //--------------------------------------------------------

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

  const draw = (obj) => {
    const { earthGroup, star } = obj;

    earthGroup.rotation.x += 0.0005;
    earthGroup.rotation.y += 0.0005;

    star.rotation.x += 0.001;
    star.rotation.y += 0.001;

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(() => {
      draw(obj);
    });
  };

  const initialize = () => {
    addLight();
    const obj = create(); //리턴값 draw에 넘겨줌
    addEvent();
    resize();
    draw(obj);
  };

  initialize();
}
