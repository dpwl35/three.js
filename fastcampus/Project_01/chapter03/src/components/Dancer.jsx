import React from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { useEffect, useState } from "react";

export function Dancer(props) {
  const group = React.useRef();
  const { scene, animations } = useGLTF("/dancer.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);
  const [currentAnimation, setcurrentAnimation] = useState("wave");

  useEffect(() => {
    actions[currentAnimation].fadeIn(0.5).play();
    return () => {
      actions[currentAnimation].fadeOut(0.5).stop();
    };
  }, [actions, currentAnimation]);

  return (
    <group
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
      scale={0.05}
      position-y={5}
      ref={group}
      {...props}
      dispose={null}
    >
      <group name="AuxScene">
        <group position={[0, -82.942, -1.295]}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name="Ch03"
            geometry={nodes.Ch03.geometry}
            material={materials.Ch03_Body}
            skeleton={nodes.Ch03.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/dancer.glb");
