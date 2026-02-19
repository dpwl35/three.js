import React, { Suspense, useEffect, useRef } from 'react';
import { GroundElements } from './structures/ground';
import { useRecoilValue } from 'recoil';
import {
  CharacterSelectFinishedAtom,
  CurrentMapAtom,
  PlayerGroundStructuresFloorPlaneCornersSelector,
  PlayersAtom,
  RecentChatsAtom,
  SelectedCharacterGlbNameIndexAtom,
} from '../../../../store/PlayersAtom';
import { CharacterInit } from '../../lobby/CharacterInit';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { Line, OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import { Player } from './player/Player';

export function RootMap() {
  const characterSelectFinished = useRecoilValue(CharacterSelectFinishedAtom);

  const players = useRecoilValue(PlayersAtom);
  const camera = useThree((three) => three.camera);
  const controls = useRef(null);

  useEffect(() => {
    if (!controls.current) return;
    camera.position.set(14, 14, 14);
    controls.current.target.set(0, 0, 0);
    return;
  }, [camera.position]);

  return (
    <>
      {!characterSelectFinished ? (
        <CharacterInit />
      ) : (
        <>
          <GroundElements />
          {players.map((player) => {
            return (
              <React.Fragment key={player.id}>
                {/* <ChatBubble
                  key={`${player.id}_chat`}
                  player={player}
                  chat={recentChats.find(
                    (recentChat) => recentChat.senderId === player.id,
                  )}
                /> */}

                <Player
                  key={player.id}
                  player={player}
                  position={
                    new Vector3(
                      player.position[0],
                      player.position[1],
                      player.position[2],
                    )
                  }
                />
              </React.Fragment>
            );
          })}
        </>
      )}
    </>
  );
}
