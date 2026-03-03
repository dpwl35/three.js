import { useTexture } from '@react-three/drei';
import { myRoomSkillBoxSize } from '../../../../../../../data/constants';

export const MyRoomPlacedSkillBox = ({ placedMyRoomSkill }) => {
  const texture = useTexture(`/images/skills/${placedMyRoomSkill.name}.webp`);
  return (
    <mesh
      castShadow
      receiveShadow
      name={`my-room-${placedMyRoomSkill.name}`}
      position={placedMyRoomSkill.position}
    >
      <boxGeometry
        args={[myRoomSkillBoxSize, myRoomSkillBoxSize, myRoomSkillBoxSize]}
      />
      <meshStandardMaterial map={texture.clone()} />
    </mesh>
  );
};
