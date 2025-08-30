import { Canvas } from "@react-three/fiber";
import Scene from "../components/Scene";
import React, { Suspense } from "react";
import { Loader, OrbitControls } from "@react-three/drei";

function Home() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* <color attach="background" args={["rgb(67, 127, 240) 100%)"]} /> */}
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <OrbitControls
          makeDefault
          enablePan={false}
          minDistance={2}
          maxDistance={5}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
      </Canvas>
      <Loader />
    </>
  );
}

export default Home;
