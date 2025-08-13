import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { DirectionalLightHelper } from "three";

export function Lights() {
  const ref = useRef();
  useHelper(ref, DirectionalLightHelper, 1, "red");
  return (
    <>
      <directionalLight ref={ref} position={[1, 3, -1]} intensity={3} />
      <ambientLight intensity={1} />
    </>
  );
}
