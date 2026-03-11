import { usePlane } from '@react-three/cannon';

export const MiniGameFloor = () => {
  const [ref] = usePlane(() => ({
    mass: 0,
    position: [0, -0.001, 0],
    rotation: [-Math.PI / 2, 0, 0],
  }));

  return (
    <mesh name='mini-game-floor' ref={ref} castShadow receiveShadow>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial color='eeeeee' />
    </mesh>
  );
};
