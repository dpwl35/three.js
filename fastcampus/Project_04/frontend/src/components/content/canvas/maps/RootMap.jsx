import React from 'react';
import { GroundElements } from './structures/ground';
import { useRecoilValue } from 'recoil';
import { CharacterSelectFinishedAtom } from '../../../../store/PlayersAtom';
import { CharacterInit } from '../../lobby/CharacterInit';

export function RootMap() {
  const characterSelectFinished = useRecoilValue(CharacterSelectFinishedAtom);
  return (
    <>{!characterSelectFinished ? <CharacterInit /> : <GroundElements />}</>
  );
}
