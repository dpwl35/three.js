import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function Earth(props) {
  const glb = useLoader(GLTFLoader, "/models/earth.glb");
  // console.log(glb);
  return (
    <mesh {...props}>
      <primitive object={glb.scene} />
    </mesh>
  );
}
