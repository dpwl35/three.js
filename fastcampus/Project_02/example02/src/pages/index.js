import { Canvas } from "@react-three/fiber";
// import Scene from "../components/Scene";
import Lights from "../components/Lights";
import { lazy, Suspense } from "react";

/* suspense React 18
  컴포넌트의 렌더링이 어떤작업이 끝날때까지 잠시 중단하고 다른 컴포넌트롤 먼저 렌더링할 수 있다
  api, grapQL에  활용 
  3D 작업을 할 때 서스펜스가 자주 활용됨 useLoader를 통해서 비동기로 모델을 불러오기 때문에 
  모델이 나오지않을떄 로딩을 구현해주는 것이 필수적이다
*/

function Sphere() {
  return (
    <mesh>
      <sphereGeometry args={[1]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
}

const Scene = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("../components/Scene"), 5000));
  });
});

function Home() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <color attach="background" args={["rgb(67, 127, 240) 100%)"]} />
      <Suspense fallback={<Sphere />}>
        <Lights />
        <Scene />
      </Suspense>
    </Canvas>
  );
}

export default Home;

// loader 은 canvas 밖에서 사용 로딩화면 쉽게 구현
