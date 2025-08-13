import { Canvas } from "@react-three/fiber";
import { Lights } from "./Lights";
import { Earth } from "./Earth";

export function Scene() {
  return (
    <Canvas camera={{ position: [0, 1, 3] }}>
      <color attach="background" args={["rgba(67, 127, 240) 100%)"]}></color>
      <Lights />
      <Earth position={[0, -2, 0]} />
    </Canvas>
  );
}
