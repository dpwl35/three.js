import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Dancer } from "./Dancer";
import { Suspense } from "react";
import { Loader } from "./Loader";
import { MovingDOM } from "./dom/MovingDOM";
import { useRecoilValue } from "recoil";
import { IsEnteredAtom } from "../stores";

export const MainCanvas = () => {
  const isEntered = useRecoilValue(IsEnteredAtom);
  const aspectRatio = window.innerWidth / window.innerHeight;
  return (
    <Canvas
      id="canvas"
      gl={{ antialias: true }}
      shadows="soft"
      camera={{
        fov: 30,
        aspect: aspectRatio,
        near: 0.01,
        far: 1000,
        position: [0, 6, 12],
      }}
      scene={{ background: new THREE.Color(0x000000) }}
    >
      <ScrollControls pages={isEntered ? 8 : 0} damping={0.25}>
        <Suspense fallback={<Loader />}>
          <MovingDOM />
          <Dancer />
        </Suspense>
      </ScrollControls>
    </Canvas>
  );
};

/* 
ScrollControls drei 에서 제공해주는 컨트롤중 하나 스크롤 이벤트를 이용가능하게 해줌 
damping = 스무스하게 이동  
pages = 화면에 꽉찬 슬라이드 페이지 

Suspense = 비동기 컴포넌트가 로드되는 동안 보여줄 **로딩 UI(fallback)**를 지정하는 리액트 컴포넌트

1. 처음 화면 로딩중일 때 Loader가 먼저 화면에 보임
2. Loader.js에서 useProgress()가 로딩 퍼센트 추적 (0% → 100%) > 로딩완료
3. useProgress().progress === 100이 되면 → "Enter" 버튼이 나타남
4. setIsEntered(true) 호출됨 → IsEnteredAtom 상태 변경
5. isEntered === true가 됐으므로 Loader는 사라지고 Dancer가 보임 



모델 로딩 중	                  | Suspense 작동	<Loader />   | (퍼센트 증가)
로딩 완료 & 아직 Enter 안 누름	 | isEntered === false	     | <Loader isCompleted /> (100% + 버튼)
사용자가 Enter 클릭	            | isEntered === true	      | Dancer 씬 등장
*/
