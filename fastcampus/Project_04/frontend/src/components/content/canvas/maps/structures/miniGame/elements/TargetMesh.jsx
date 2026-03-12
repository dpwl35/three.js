import { useSphere } from '@react-three/cannon';
import { useThree } from '@react-three/fiber';
import { DoubleSide } from 'three';

export const TargetMesh = ({ position, color, shapes, setHitCount }) => {
  const three = useThree();
  const [ref] = useSphere(() => ({
    mass: 5,
    position: [position.x, position.y, position.z],
    collisionFilterGroup: 2,
    collisionFilterMask: 1,
    onCollide: (e) => {
      if (!ref.current) return;
      if (e.contact.bj.name === 'bullet') {
        setHitCount((prev) => prev + 1);
        const timeout = setTimeout(() => {
          ref.current.visible = false;
          const bullet = three.scene.getObjectByName('bullet');
          if (bullet) {
            three.scene.remove(bullet);
          }
          three.scene.remove(ref.current);
          clearTimeout(timeout);
        }, 1000);
      }
    },
  }));

  return (
    <mesh
      visible
      name='target'
      castShadow
      receiveShadow
      ref={ref}
      position={position}
    >
      <sphereGeometry args={[shapes.x]} />
      <meshStandardMaterial color={color} side={DoubleSide} />
    </mesh>
  );
};
