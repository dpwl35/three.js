import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import vertexShader from '../shaders/earth/vertex.glsl?raw';
import fragmentShader from '../shaders/earth/fragment.glsl?raw';
import pointsVertexShader from '../shaders/earthPoints/vertex.glsl?raw';
import pointsFragmentShader from '../shaders/earthPoints/fragment.glsl?raw';
import glowVertexShader from '../shaders/earthGlow/vertex.glsl?raw';
import glowFragmentShader from '../shaders/earthGlow/fragment.glsl?raw';
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper.js';

export default function () {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
  });
  renderer.setClearColor(0x000000, 1);

  const container = document.querySelector('#container');

  container.appendChild(renderer.domElement);

  const canvasSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const textureLoader = new THREE.TextureLoader(); //텍스처불러오기
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    canvasSize.width / canvasSize.height,
    0.1,
    100
  );
  camera.position.set(0, 0, 2);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;

  const createEarth = () => {
    const material = new THREE.ShaderMaterial({
      // wireframe: true,
      uniforms: {
        //ShaderMaterial는 map 사용 X
        uTexture: {
          value: textureLoader.load('assets/earth_specular_map.png'),
        },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
    });
    const geometry = new THREE.SphereGeometry(0.8, 30, 30);
    const mesh = new THREE.Mesh(geometry, material);

    return mesh;
  };

  const createEarthPoints = () => {
    const material = new THREE.ShaderMaterial({
      wireframe: true,
      uniforms: {
        uTexture: {
          value: textureLoader.load('assets/earth_specular_map.png'),
        },
      },
      vertexShader: pointsVertexShader,
      fragmentShader: pointsFragmentShader,
      side: THREE.DoubleSide, //양쪽 사이드 렌더링
      transparent: true,
      depthWrite: false, //뒤에있는걸 숨기려는 속성 겹치면 검은 테두리 보임off
      depthTest: false
    });

    const geometry = new THREE.IcosahedronGeometry(0.8, 30, 30);
    geometry.rotateY(-Math.PI);
    const mesh = new THREE.Points(geometry, material);

    return mesh;
  };

  const createEarthGlow = () => {
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uZoom: {
          value: 1,
        },
      },
      vertexShader: glowVertexShader,
      fragmentShader: glowFragmentShader,
      side: THREE.BackSide,
      transparent: true,
    });

    const geometry = new THREE.IcosahedronGeometry(1, 40, 40);
    const mesh = new THREE.Mesh(geometry, material);

    return mesh;
  };

  const create = () => {
    const earth = createEarth();
    const earthPoints = createEarthPoints();
    const earthGlow = createEarthGlow();
    //const glowNormalsHelper = new VertexNormalsHelper(earthGlow, 0.1);

    scene.add(earth, earthPoints, earthGlow);

    return {
      earthGlow,
    };
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
    window.addEventListener('resize', resize);
  };

  const draw = (obj) => {
    const { earthGlow } = obj;

    controls.update();
    renderer.render(scene, camera);

    earthGlow.material.uniforms.uZoom.value = controls.target.distanceTo(
      controls.object.position
    ); //카메라 위치 바꿔도 (드래그)글로우 효과 잘 유지됨

    requestAnimationFrame(() => {
      draw(obj);
    });
  };

  const initialize = () => {
    const obj = create();

    create();
    addEvent();
    resize();
    draw(obj);
  };

  initialize();
}
