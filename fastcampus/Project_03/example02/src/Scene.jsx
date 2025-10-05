import { Canvas } from "@react-three/fiber";
import { Ground } from "./Ground";
import { Physics, Debug } from "@react-three/cannon";
import Car from "./Car";
import DummyBox from "./dummy/DummyBox";
import DummyBall from "./dummy/DummyBall";
import DummyWall from "./dummy/DummyWall";
//import DummyMovementArea from "./dummy/DummyMovementArea";

function Scene() {
  return (
    <>
      <Canvas camera={{ fov: 45, position: [1.5, 2, 5] }}>
        <color attach="background" />
        <ambientLight />
        <directionalLight position={[0, 5, 5]} />
        <Physics gravity={[0, -2.6, 0]}>
          <Debug>
            <Car />
            <DummyBox position={[1, 0.2, -2]} args={[0.2, 0.2, 0.2]} />
            <DummyBall position={[0, 0.2, -2]} args={[0.15]} />
            {/* <DummyMovementArea position={[0, -0.2, 0]} /> */}

            <DummyWall position={[5, 0.5, 0]} args={[1, 1, 10]} />
            <DummyWall position={[0, 0.5, 5]} args={[10, 1, 1]} />
            <DummyWall position={[0, 0.5, -5]} args={[10, 1, 1]} />
            <DummyWall position={[-5, 0.5, 0]} args={[1, 1, 10]} />

            <Ground rotation={[-Math.PI / 2, 0, 0]} />
          </Debug>
        </Physics>
      </Canvas>
    </>
  );
}

export default Scene;
