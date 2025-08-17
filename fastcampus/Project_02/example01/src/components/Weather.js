import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function Weather(props) {
  const { position, weather } = props;
  const glb = useLoader(GLTFLoader, "/models/weather.glb");
  console.log(glb);
  return (
    <mesh position={position}>
      <primitive object={glb.nodes[weather]} />
    </mesh>
  );
}

/* 
nodes에서도 모델들 확인 가능 
<primitive object={glb.scene.children[0]} />
*/
