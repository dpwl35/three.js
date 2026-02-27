import React, { Suspense, useEffect, useRef } from 'react';
import { GroundElements } from './structures/ground';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  CharacterSelectFinishedAtom,
  CurrentMapAtom,
  PlayerGroundStructuresFloorPlaneCornersSelector,
  PlayersAtom,
  RecentChatsAtom,
} from '../../../../store/PlayersAtom';
import { CharacterInit } from '../../lobby/CharacterInit';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Player } from './player/Player';
import { Line, OrbitControls } from '@react-three/drei';
import { Loader } from '../../loader/Loader';
import { ChatBubble } from './structures/ground/3dUIs/ChatBubble';
import { MyRoom } from './structures/myRoom';
import gsap from 'gsap';
//import { MiniGame } from './structures/miniGame';

export function RootMap() {
  const characterSelectFinished = useRecoilValue(CharacterSelectFinishedAtom);
  const playerGroundStructuresFloorPlaneCorners = useRecoilValue(
    PlayerGroundStructuresFloorPlaneCornersSelector,
  );
  const currentMap = useRecoilValue(CurrentMapAtom);
  const players = useRecoilValue(PlayersAtom);
  const recentChats = useRecoilValue(RecentChatsAtom);
  const camera = useThree((three) => three.camera);
  const controls = useRef(null);

  useEffect(() => {
    if (currentMap === 'GROUND') {
      document.exitPointerLock();
      if (!controls.current) return;

      camera.position.set(14, 14, 14);
      controls.current.target.set(0, 0, 0);
      return;
    }

    if (currentMap === 'MY_ROOM') {
      if (!controls.current) return;
      gsap.fromTo(
        camera.position,
        {
          duration: 1,
          x: 0,
          y: 0,
          z: 0,
        },
        {
          x: 25,
          y: 25,
          z: 25,
        },
      );

      return;
    }

    if (!controls.current) return;
    camera.position.set(14, 14, 14);
    controls.current.target.set(0, 0, 0);
    return;
  }, [camera, camera.position, currentMap]);

  return (
    <>
      <ambientLight
        name='ambientLight'
        intensity={currentMap === 'GROUND' ? 5 : 0.5}
      />
      <OrbitControls
        ref={controls}
        minDistance={5}
        maxDistance={1000}
        maxPolarAngle={currentMap === 'MY_ROOM' ? Math.PI / 2 : Math.PI}
        maxAzimuthAngle={currentMap === 'MY_ROOM' ? Math.PI / 2 : Infinity}
        minAzimuthAngle={currentMap === 'MY_ROOM' ? 0 : -Infinity}
      />
      {/* 
      {currentMap !== 'MINI_GAME' && (
        <OrbitControls
          ref={controls}
          minDistance={5}
          maxDistance={1000}
          maxPolarAngle={currentMap === 'MY_ROOM' ? Math.PI / 2 : Math.PI}
          maxAzimuthAngle={currentMap === 'MY_ROOM' ? Math.PI / 2 : Infinity}
          minAzimuthAngle={currentMap === 'MY_ROOM' ? 0 : -Infinity}
        />
      )} */}

      {currentMap === 'GROUND' && (
        <Suspense fallback={<Loader />}>
          <directionalLight
            castShadow
            intensity={10}
            position={[0, 50, -50]}
            shadow-normalBias={0.1}
            shadow-camera-left={-25}
            shadow-camera-right={25}
            shadow-camera-top={25}
            shadow-camera-bottom={-25}
            shadow-camera-near={0.1}
            shadow-camera-far={200}
          />
          {!characterSelectFinished ? (
            <CharacterInit />
          ) : (
            <>
              <GroundElements />
              {playerGroundStructuresFloorPlaneCorners?.map((corner) => {
                return (
                  <Line
                    key={corner.name}
                    color='red'
                    points={corner.corners.map((c) => [c.x, 0.01, c.z])}
                  />
                );
              })}
              {players.map((player) => {
                return (
                  <React.Fragment key={player.id}>
                    <ChatBubble
                      key={`${player.id}_chat`}
                      player={player}
                      chat={recentChats.find(
                        (recentChat) => recentChat.senderId === player.id,
                      )}
                    />
                    <Player
                      key={`${player.id}_character`}
                      player={player}
                      position={
                        new THREE.Vector3(
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
        </Suspense>
      )}
      {currentMap === 'MY_ROOM' && <MyRoom />}
      {/* {currentMap === "MINI_GAME" && <MiniGame />} */}
    </>
  );
}
