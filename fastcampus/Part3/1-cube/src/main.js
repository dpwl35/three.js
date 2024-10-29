import * as THREE from 'three';

window.addEventListener('load', function () {
  init();
})

function init() {
  const renderer = new THREE.WebGL1Renderer({ 
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight) 

  document.body.appendChild(renderer.domElement); 

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500,
  );

  const geometry = new THREE.BoxGeometry(2, 2, 2); 
  const meterial = new THREE.MeshStandardMaterial({ 
    color: 0xcc99ff,
  });

  meterial.color = new THREE.Color(0x00c896)

  const cube = new THREE.Mesh(geometry, meterial); 

  scene.add(cube);

  camera.position.set(3, 4, 5);
  camera.lookAt(cube.position);

  const directionalLight = new THREE.DirectionalLight(0xf0f0f0, 1);

  directionalLight.position.set(-1, 2, 3);

  scene.add(directionalLight);

  
  const ambientLight = new THREE.AmbientLight(0xf0f0f0, 0.2);
  ambientLight.position.set(3, 2, 1);
  scene.add(ambientLight);

  
  render()


  function render() {

    cube.rotation.x += 0.01; 

    renderer.render(scene, camera);

    requestAnimationFrame(render);

  }


  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight)
    
    renderer.render(scene, camera)
  }

  window.addEventListener('resize', handleResize)
}