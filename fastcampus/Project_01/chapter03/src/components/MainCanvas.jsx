import { Canvas } from "@react-three/fiber";
import { Color } from "three";
import { Meshes } from "./Meshes";
import { Lights } from "./Lights";
import { Controls } from "./Controls";
import { GLBModel } from "./GLBModel";

export const MainCanvas = () => {
  return (
    <Canvas
      gl={{ antialias: true }}
      shadows={"soft"}
      camera={{
        fov: 60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 100,
        position: [15, 15, 15],
      }}
      scene={{ background: new Color(0x000000) }} // 매번 리렌더되므로, 지양해야할 패턴
    >
      <Controls />
      <Lights />
      <Meshes />
      <GLBModel />
    </Canvas>
  );
};
