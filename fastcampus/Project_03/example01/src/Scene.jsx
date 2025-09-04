import { Canvas } from "@react-three/fiber";
import { Box } from "./Box";
import { Ground } from "./Ground";
import { Physics } from "@react-three/cannon";
import { useControls } from "leva";
import { Shpere } from "./Shpere";
import { Cylinder } from "./Cylinder";

function Scene() {
  const bgValue = useControls({ bgColor: "#fff" });

  const gravity = useControls("Gravity", {
    x: { value: 0 },
    y: { value: -9.81 },
    z: { value: 0 },
  });

  return (
    <>
      <Canvas camera={{ position: [0, 2, 4] }}>
        <color attach="background" args={[bgValue.bgColor]} />
        <Physics gravity={[gravity.x, gravity.y, gravity.z]}>
          <ambientLight />
          <directionalLight position={[0, 5, 5]} />
          <Cylinder position={[-1, 1, 0]} />
          <Shpere position={[2, 1, 0]} />
          <Box position={[0, 1, 0]} />
          <Ground rotation={[-Math.PI / 2, 0, 0]} />
        </Physics>
      </Canvas>
    </>
  );
}

export default Scene;
