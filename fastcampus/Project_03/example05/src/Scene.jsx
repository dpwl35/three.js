import { Canvas } from "@react-three/fiber";
import { Ground } from "./Ground";
import { Physics, Debug } from "@react-three/cannon";
import Car from "./Car";
import { useRecoilValue } from "recoil";
//import { useEffect } from "react";
import { isStartScene } from "./utils/atom";
import { Stats } from "@react-three/drei";
import DrawCall from "./components/DrawCallCount";
//import fontjson from "./Pretendard.json";

function Scene() {
  const isStart = useRecoilValue(isStartScene);

  // useEffect(() => {
  //   const fontData = fontjson;
  //   console.log(fontData);
  //   const targetText = "How to Play↑←↓→";
  //   const modifiedGlyphs = {};

  //   for (let i = 0; i < targetText.length; i++) {
  //     const char = targetText[i];
  //     const charKey = char in fontData.glyphs ? char : char.toUpperCase;

  //     if (charKey in fontData.glyphs) {
  //       modifiedGlyphs[charKey] = fontData.glyphs[charKey];
  //     }
  //   }

  //   const modifiefontData = {
  //     ...fontData,
  //     glyphs: modifiedGlyphs,
  //   };

  //   console.log(JSON.stringify(modifiefontData));
  // }, []);

  // useEffect(() => {
  //   console.log(isStart);
  // }, [isStart]);

  return (
    <>
      <Canvas camera={{ fov: 45, position: [1.5, 2, 4] }}>
        <ambientLight />
        <directionalLight position={[0, 5, 5]} />
        <Physics gravity={[0, -2.6, 0]}>
          <Debug>
            {isStart && <Car />}
            <Ground />
          </Debug>
        </Physics>
        <DrawCall />
        <Stats showPanel={0} />
      </Canvas>
    </>
  );
}

export default Scene;
