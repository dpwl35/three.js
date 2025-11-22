import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { RootMap } from "./maps/RootMap";
// import { useRecoilValue } from "recoil";
// import { CurrentMapAtom } from "../../../store/PlayersAtom";
// import { Physics } from "@react-three/cannon";

export const MainCanvas = () => {
  const aspectRatio = window.innerWidth / window.innerHeight;

  return (
    <Canvas
      id="canvas"
      gl={{ antialias: true }}
      shadows
      camera={{
        fov: 30,
        aspect: aspectRatio,
        near: 0.01,
        far: 100000,
        position: [12, 12, 12],
      }}
    ></Canvas>
  );
};
