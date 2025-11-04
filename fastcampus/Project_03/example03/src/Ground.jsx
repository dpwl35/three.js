import React from "react";
import { usePlane } from "@react-three/cannon";
import DummyBall from "./dummy/DummyBall";
import DummyBox from "./dummy/DummyBox";
import DummyWall from "./dummy/DummyWall";
import { Three } from "./components/Three";
import { Ball } from "./components/Ball";

export function Ground(props) {
  const [meshRef] = usePlane(() => ({
    args: [15, 15],
    mass: 1,
    type: "Static",
    ...props,
  }));

  return (
    <group>
      <mesh {...props} ref={meshRef} receiveShadow>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="white" opacity={0} transparent />
      </mesh>

      <Three position={[1, 0.5, -1]} />
      <Three position={[-1, 0.5, -1]} />
      <Three position={[3, 0.5, -1]} />
      <Three position={[-3, 0.5, -1]} />

      <Ball position={[2, 0.5, -1]} />

      {/* <DummyBall position={[0, 0.2, -2]} args={[0.15]} /> */}
      <DummyBox position={[1, 0.2, -2]} args={[0.2, 0.2, 0.2]} />
      <DummyBox
        position={[-1, 0.2, 1.5]}
        args={[0.2, 0.4, 0.2]}
        type={"Static"}
      />
      <DummyWall position={[5, 0.5, 0]} args={[1, 1, 10]} />
      <DummyWall position={[0, 0.5, 5]} args={[10, 1, 1]} />
      <DummyWall position={[0, 0.5, -5]} args={[10, 1, 1]} />
      <DummyWall position={[-5, 0.5, 0]} args={[1, 1, 10]} />
    </group>
  );
}
