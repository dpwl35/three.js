import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

export const GLBModel = () => {
  const { scene, animations } = useGLTF("/dancer.glb");
  const ref = useRef(null);
  const [currentAnimation, setcurrentAnimation] = useState("wave");

  const { actions } = useAnimations(animations, ref);
  //console.log(actions);

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [actions, scene]);

  useEffect(() => {
    actions[currentAnimation].fadeIn(0.5).play();
    return () => {
      actions[currentAnimation].fadeOut(0.5).stop();
    };
  }, [actions, currentAnimation]);

  return (
    <primitive
      onClick={() => {
        setcurrentAnimation((prev) => {
          if (prev === "wave") return "windmill";
          return "wave";
        });
      }}
      onPointerUp={() => {
        console.log("업");
      }}
      onPointerDown={() => {
        console.log("다운");
      }}
      ref={ref}
      scale={0.05}
      position-y={5}
      object={scene}
    />
  );
};
