import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export const Lights = () => {
  const lightRef = useRef(null);
  useHelper(lightRef, THREE.DirectionalLightHelper, 3, 0xffff00);
  return (
    <>
      {/* directionalLight 및 간단한 그림자 설정 */}
      <directionalLight
        ref={lightRef}
        args={[0xffffff, 5]}
        position={[4, 4, 4]}
        castShadow
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-camera-near={0.1}
        shadow-camera-far={1000}
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
      />
    </>
  );
};
