import React from "react";
import { useGLTF } from "@react-three/drei";

useGLTF.preload("/assets/models/car_taxi.glb");

export function Wheel({ wheelRef, radius, leftSide }) {
  const { nodes, materials } = useGLTF("/assets/models/car_taxi.glb");
  return (
    <group ref={wheelRef} scale={radius * 10}>
      <group rotation={leftSide ? [0, -Math.PI, 0] : [0, 0, 0]}>
        <mesh
          geometry={nodes.Car01_2_WhFL002_0.geometry}
          material={materials.mt_PalleteBR}
          rotation={[-1.576, 0, 0]}
          scale={0.32}
        />
      </group>
    </group>
  );
}
