import React, { useState } from "react";
import { useSphere } from "@react-three/cannon";

export function Shpere(props) {
  const [meshRef] = useSphere(() => ({ args: [1, 1, 1], mass: 1, ...props }));

  const [hovered, setHover] = useState(false);

  return (
    <mesh
      {...props}
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <sphereGeometry args={[0.5]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}
