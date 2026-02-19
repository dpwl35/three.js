import React from 'react';
import { usePlayer } from './hooks/usePlayer';
import { Textboard } from '../structures/ground/3dUIs/Textboard';

export function Player({ player, position, modelIndex: mIdx }) {
  const modelIndex = mIdx ?? player.selectedCharacterGlbNameIndex;
  const {
    me,
    nicknameRef,
    playerRef,
    memoizedPosition,
    playerId,
    nodes,
    materials,
    setCurrentMyRoomPlayer,
  } = usePlayer({
    player,
    position,
    modelIndex,
  });

  return (
    <>
      {me && (
        <Textboard
          ref={nicknameRef}
          text={`${player?.nickname}[${player?.jobPosition}]`}
        />
      )}
      <group
        ref={playerRef}
        position={memoizedPosition}
        name={playerId ?? ''}
        onClick={(e) => {
          e.stopPropagation();
          if (me?.id !== playerId) {
            setCurrentMyRoomPlayer(player);
          }
        }}
        dispose={null}
      >
        <group name='Root_Scene'>
          <group name='RootNode'>
            <group
              name='CharacterArmature'
              rotation={[-Math.PI / 2, 0, 0]}
              scale={100}
            >
              <primitive object={nodes.Root} />
            </group>
            <skinnedMesh
              castShadow
              receiveShadow
              name='Character'
              geometry={nodes.Character['geometry']}
              material={
                modelIndex === 1 ? materials['Atlas.001'] : materials.Atlas
              }
              skeleton={nodes.Character['skeleton']}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={100}
            />
          </group>
        </group>
      </group>
    </>
  );
}
