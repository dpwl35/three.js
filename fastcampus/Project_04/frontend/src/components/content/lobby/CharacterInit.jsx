import { useThree } from '@react-three/fiber';
import { SelectedCharacterGlbNameIndexAtom } from '../../../store/PlayersAtom';
import { useRecoilValue } from 'recoil';
import { useEffect, useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';
import { Man } from '../canvas/maps/player/Man';
import { Kid } from '../canvas/maps/player/Kid';
import { Woman } from '../canvas/maps/player/Woman';
// import { Player } from '../canvas/maps/player/Player';

export const CharacterInit = () => {
  const camera = useThree((three) => three.camera);
  const selectedCharacterGlbNameIndex = useRecoilValue(
    SelectedCharacterGlbNameIndexAtom,
  );

  const controls = useRef(null);
  useEffect(() => {
    if (!controls.current?.target) return;
    camera.position.set(8, 8, 8);
    controls.current.target.set(0, 1, 0);
  }, [camera.position]);

  return (
    <>
      {/* <Player
        key={selectedCharacterGlbNameIndex}
        player={undefined}
        position={new Vector3(0, 0, 0)}
        modelIndex={selectedCharacterGlbNameIndex}
      /> */}
      {selectedCharacterGlbNameIndex === 0 && (
        <Man
          player={undefined}
          position={new Vector3(0, 0, 0)}
          modelIndex={0}
        />
      )}

      {selectedCharacterGlbNameIndex === 1 && (
        <Woman
          player={undefined}
          position={new Vector3(0, 0, 0)}
          modelIndex={1}
        />
      )}

      {selectedCharacterGlbNameIndex === 2 && (
        <Kid
          player={undefined}
          position={new Vector3(0, 0, 0)}
          modelIndex={2}
        />
      )}
      <OrbitControls
        ref={controls}
        minDistance={1}
        maxDistance={8}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={-Math.PI / 2}
        autoRotate
      />
    </>
  );
};
