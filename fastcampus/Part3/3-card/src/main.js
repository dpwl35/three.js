import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { gsap } from 'gsap';
import { GUI } from 'lil-gui';
import Card from './Card'

window.addEventListener('load', function () {
  init();
})

function init() {
  const gui = new GUI();

  const COLORS = ['#ff6e6e', '#31e0c1', '#006fff', '#ffd732'];

  const renderer = new THREE.WebGL1Renderer({ //렌더 생성 
    antialias: true,
    alpha: true // renderer 배경 투명화
  });

  renderer.setSize(window.innerWidth, window.innerHeight) 

  document.body.appendChild(renderer.domElement); 

  //씬 
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500,
  );

  camera.position.z = 25;

  //카메라 회전
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.autoRotate = true; 
  controls.autoRotateSpeed = 2.5;
  controls.rotateSpeed = 0.75; // 드래그 했을 때 회전하는 속도
  controls.enableDamping = true; // 관성(드래그 후 좀 더 회전하려는 성질) 
  controls.enableZoom = false; //줌 인 아웃 X 
  controls.minPolarAngle = Math.PI / 2 - Math.PI / 3; //회전각도 제한 
  controls.maxPolarAngle = Math.PI / 2 + Math.PI / 3;
  
  //카드 
  const card = new Card({
    width: 10,
    height: 15.8,
    radius : 0.5,
    color: COLORS[0],
  })
  card.mesh.rotation.z = Math.PI * 0.1;
  scene.add(card.mesh)

  //카드회전 애니메이션 2바퀴 
  gsap.to(card.mesh.rotation, { y: -Math.PI * 4, duration: 2.5, ease: 'back.out(2.5)' });

  //GUI
  const cardFolder = gui.addFolder('Card');
  cardFolder
    .add(card.mesh.material, 'roughness')
    .min(0)
    .max(1)
    .step(0.01)
    .name('material.roughness');
  cardFolder
    .add(card.mesh.material, 'metalness')
    .min(0)
    .max(1)
    .step(0.01)
    .name('material.metalness');

  //조명 
  const ambeientLeight = new THREE.AmbientLight(0xffffff, 0.8)
  ambeientLeight.position.set(-5, -5, -5)
  scene.add(ambeientLeight)

  //재질 조명
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.6); // 색상과 강도
  const directionalLight2 = directionalLight1.clone(); //클론으로 추가
  directionalLight1.position.set(1, 1, 3);
  directionalLight2.position.set(-1, 1, -3);
  scene.add(directionalLight1, directionalLight2);



  render()

  function render() {
    controls.update();

    renderer.render(scene, camera);

    requestAnimationFrame(render);

  }


  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    //변경된 윈도우 사이즈를 종횡비로 다시 계산
    camera.updateProjectionMatrix();
    //카메라 속성 변경됐을 때 호출해 결과 반영
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
    //새롭게 렌더된 결과 화면에 반영 
  }

  window.addEventListener('resize', handleResize);


  //버튼 색상 변경
  const container = document.querySelector('.container');

  COLORS.forEach(color => {
    const button = document.createElement('button');

    button.style.backgroundColor = color;

    button.addEventListener('click', () => {
      card.mesh.material.color = new THREE.Color(color);

      gsap.to(card.mesh.rotation, { y: card.mesh.rotation.y - Math.PI / 2, duration: 1, ease: 'back.out(2.5)' });
    })

    container.appendChild(button);
  });
}