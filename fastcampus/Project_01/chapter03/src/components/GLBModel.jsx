import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export const GLBModel = () => {
  const { scene } = useGLTF("/dancer.glb");

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [scene]);
  return <primitive scale={0.05} position-y={5} object={scene} />;
};
