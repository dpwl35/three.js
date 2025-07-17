import { Html, useProgress } from "@react-three/drei";
import { useRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import { IsEnteredAtom } from "../stores";
import React from "react";

export const Loader = ({ isCompleted }) => {
  const [isEntered, setIsEntered] = useRecoilState(IsEnteredAtom);
  const progress = useProgress();
  console.log("progress", progress);

  if (isEntered) return null;

  return (
    <Html center>
      <BlurredBackground />
      <Container>
        <ProgressBar>{isCompleted ? 100 : progress.progress}%</ProgressBar>
        {progress.progress === 100 && (
          <EnterBtn
            onClick={() => {
              setIsEntered(true);
            }}
          >
            Enter
          </EnterBtn>
        )}
      </Container>
    </Html>
  );
};

/*
useRecoilState 값을 변경하고 싶을 때 

cancas 하위에는 cancas만 가능하지만 deri 에서 제공하는 Html 컴포넌트를 사용하면 cancas가 아니더라도 하위에 넣어줄 수 있다.

isCompleted가 true일 경우: 로딩 퍼센트를 **무조건 100%**로 고정해서 보여줌 
*/

const blink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const BlurredBackground = styled.div`
  width: 400px;
  height: 400px;
  background-color: red;
  border-radius: 50%;
  filter: blur(300px);
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;
const ProgressBar = styled.div`
  font-size: 24px;
  color: #ccc;
`;

const EnterBtn = styled.button`
  animation: ${blink} 1.5s infinite;
  transition-duration: 0.4s;
  font-size: 16px;
  outline: none;
  border: 0.5px solid #999;
  padding: 8px 18px;
  background-color: transparent;
  color: #ccc;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
    color: #dc4f00;
  }
`;
