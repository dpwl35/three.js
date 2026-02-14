import { useState } from 'react';
import { STEPS } from '../../../data/constants';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  CharacterSelectFinishedAtom,
  SelectedCharacterGlbNameIndexAtom,
} from '../../../store/PlayersAtom';
import { socket } from '../../../sockets/clientSocket';
import { isValidText } from '../../../utils';
import { styled } from 'styled-components';
import { MainCanvas } from '../canvas/MainCanvas';

export const Lobby = () => {
  const [currentStep, setCurrentStep] = useState(STEPS.NICK_NAME);
  const [tempNickname, setTempNickname] = useState();
  const [tempJobPosition, setTempJobPosition] = useState();
  const [selectedCharacterGlbNameIndex, setSelectedCharacterGlbNameIndex] =
    useRecoilState(SelectedCharacterGlbNameIndexAtom);

  const setCharacterSelectFinished = useSetRecoilState(
    CharacterSelectFinishedAtom,
  );

  if (!socket) return null;

  return (
    <LoginContainer>
      {currentStep === STEPS.NICK_NAME && (
        <>
          <LoginTitle>패디에서 사용할 내 이름이에요.</LoginTitle>
          <Input
            autoFocus
            placeholder='별명을 입력해주세요.'
            onChange={(e) => {
              setTempNickname(e.currentTarget.value);
            }}
            onKeyUp={(e) => {
              if (!isValidText(tempNickname)) return;
              if (e.key === 'Enter') {
                setCurrentStep((prev) => prev + 1);
              }
            }}
          />
          <NextBtn
            disabled={!isValidText(tempNickname)}
            className={isValidText(tempNickname) ? 'valid' : 'disabled'}
            onClick={() => {
              setCurrentStep((prev) => prev + 1);
            }}
          >
            이대로 진행할래요
          </NextBtn>
        </>
      )}
      {currentStep === STEPS.JOB_POSITION && (
        <>
          <LoginTitle>패디에서 공유할 내 직군이에요.</LoginTitle>
          <Input
            autoFocus
            placeholder='개발 직군을 입력해주세요.'
            onChange={(e) => {
              setTempJobPosition(e.currentTarget.value);
            }}
            onKeyUp={(e) => {
              if (!isValidText(tempJobPosition)) return;
              if (e.key === 'Enter') {
                setCurrentStep((prev) => prev + 1);
              }
            }}
          />
          <NextBtn
            disabled={!isValidText(tempJobPosition)}
            className={isValidText(tempJobPosition) ? 'valid' : 'disabled'}
            onClick={() => {
              setCurrentStep((prev) => prev + 1);
            }}
          >
            이대로 진행할래요
          </NextBtn>
          <PrevBtn
            onClick={() => {
              setCurrentStep((prev) => prev - 1);
            }}
          >
            이전으로 돌아갈래요
          </PrevBtn>
        </>
      )}
      {currentStep === STEPS.CHARACTER && (
        <>
          <LoginTitle>패디에서 사용할 내 아바타를 고를 시간이에요.</LoginTitle>
          <CharacterCanvasContainer>
            <CharacterTuningWrapper>
              <CharacterCanvasWrapper>
                <MainCanvas />
              </CharacterCanvasWrapper>
            </CharacterTuningWrapper>

            <NextBtn
              className={
                !tempNickname || !tempJobPosition ? 'disabled' : 'valid'
              }
              onClick={() => {
                if (!tempNickname || !tempJobPosition) return;
                socket.emit('initialize', {
                  tempNickname,
                  tempJobPosition,
                  selectedCharacterGlbNameIndex,
                  myRoom: { object: [] },
                });
                setCharacterSelectFinished(true);
              }}
              onKeyUp={(e) => {
                if (!tempNickname || !tempJobPosition) return;
                if (e.key === 'Enter') {
                  //입력한 값 서버로 전송 > server.js
                  socket.emit('initialize', {
                    tempNickname,
                    tempJobPosition,
                    selectedCharacterGlbNameIndex,
                    myRoom: { object: [] },
                  });
                  setCharacterSelectFinished(true);
                }
              }}
            >
              이 모습으로 진행할래요.
            </NextBtn>

            <PrevBtn
              onClick={() => {
                setSelectedCharacterGlbNameIndex((prev) => {
                  if (prev === undefined) return 1;
                  if (prev === 2) return 0;
                  return prev + 1;
                });
              }}
            >
              다른 캐릭터도 볼래요
            </PrevBtn>
            <PrevBtn
              onClick={() => {
                setCurrentStep((prev) => prev - 1);
              }}
            >
              이전으로 돌아갈래요
            </PrevBtn>
          </CharacterCanvasContainer>
        </>
      )}
    </LoginContainer>
  );
};

/*
constants.js 에서 가져온 STEPS 기준으로 단계 관리
setCurrentStep(prev => prev + 1) → 다음 단계로 이동
*/

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 100%;
  background-color: #85e6ff;
`;

const LoginTitle = styled.div`
  font-size: 22px;
  font-weight: 700;
`;

const CharacterCanvasContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 1200px;
  height: 80%;
`;

const CharacterTuningWrapper = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const CharacterCanvasWrapper = styled.div`
  flex: 2;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  font-size: 24px;
  border: none;
  outline: none;
  padding: 12px 10px;
  border-radius: 8px;
  width: 280px;
  font-size: 18px;
`;

const NextBtn = styled.button`
  padding: 10px;
  width: 280px;
  font-size: 14px;
  border-radius: 8px;
  border: none;
  outline: none;
  font-weight: 600;
  transition-duration: 0.2s;
  &.valid {
    background-color: #6731a1;
    color: #ffffff;
    cursor: pointer;
    &:hover {
      background-color: #340070;
      color: #ffffff;
    }
  }
  &.disabled {
    background-color: #8aceff;
    color: #ededed;
    cursor: not-allowed;
  }
`;

const PrevBtn = styled.button`
  padding: 10px;
  width: 280px;
  font-size: 14px;
  border-radius: 8px;
  border: none;
  outline: none;
  font-weight: 600;
  color: #666666;
  cursor: pointer;
`;
