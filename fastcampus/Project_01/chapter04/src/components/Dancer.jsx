import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { IsEnteredAtom } from "../stores";
import { Loader } from "./Loader";

export const Dancer = () => {
  const isEntered = useRecoilValue(IsEnteredAtom);
  const dancerRef = useRef(null);
  const { scene, animations } = useGLTF("/models/dancer.glb");
  //console.log(scene, animations);

  const { actions } = useAnimations(animations, dancerRef);

  const scroll = useScroll();
  useFrame(() => {
    console.log(scroll.offset);
  });

  useEffect(() => {
    if (!isEntered) return;

    actions["wave"].play();
  }, [actions, isEntered]);

  if (isEntered) {
    return (
      <>
        <ambientLight intensity={2} />
        <primitive ref={dancerRef} object={scene} scale={0.05} />
      </>
    );
  }

  return <Loader isCompleted />;
};

/*
useRecoilValue : isEntered값만 사용할 때 

return <Loader isCompleted />; >  유저가 아직 "Enter" 버튼을 누르지 않은 상태일 때 보여주는 UI
*/
