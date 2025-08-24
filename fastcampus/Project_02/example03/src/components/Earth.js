import { useLoader, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Earth = () => {
  const glb = useLoader(GLTFLoader, "/models/earth.glb");

  const ref = useRef(null);

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.1;
  });

  return (
    <mesh scale={1.3} rotation-x={-Math.PI / 2} position={[0, -2, 0]} ref={ref}>
      <primitive object={glb.scene} />
    </mesh>
  );
};

export default Earth;
