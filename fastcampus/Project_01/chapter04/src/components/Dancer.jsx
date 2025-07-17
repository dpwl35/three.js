import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { IsEnteredAtom } from "../stores";
import { Loader } from "./Loader";
import gsap from "gsap";

let timeline;

export const Dancer = () => {
  const three = useThree();
  const isEntered = useRecoilValue(IsEnteredAtom);
  const dancerRef = useRef(null);
  const { scene, animations } = useGLTF("/models/dancer.glb");
  //console.log(scene, animations);

  const { actions } = useAnimations(animations, dancerRef);

  const scroll = useScroll();
  useFrame(() => {
    console.log(scroll.offset);
    if (!isEntered) return;
    //타임라인제어
    timeline.seek(scroll.offset * timeline.duration());
  });

  useEffect(() => {
    if (!isEntered) return;

    actions["wave"].play();
  }, [actions, isEntered]);

  useEffect(() => {
    if (!isEntered) return;
    if (!dancerRef.current) return;

    gsap.fromTo(
      three.camera.position,
      {
        x: -5,
        y: 5,
        z: 5,
      },
      {
        duration: 2.5,
        x: 0,
        y: 6,
        z: 12,
      }
    );
    gsap.fromTo(
      three.camera.rotation,
      { z: Math.PI },
      {
        duration: 2.5,
        z: 0,
      }
    );
  }, [isEntered, three.camera.position, three.camera.rotation]);

  useEffect(() => {
    if (!isEntered) return;
    if (!dancerRef.current) return;
    timeline = gsap.timeline();
    timeline.from(
      dancerRef.current.rotation,
      {
        duration: 4,
        y: -4 * Math.PI,
      },
      0.5
    );
  }, [isEntered]);

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
