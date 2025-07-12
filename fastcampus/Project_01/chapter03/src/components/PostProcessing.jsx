import { DotScreen, EffectComposer } from "@react-three/postprocessing";

export const PostProcessing = () => {
  return (
    <EffectComposer disableNormalPass>
      {/* <Bloom
        intensity={0.5}
        mipmapBlur
        luminanceThreshold={1}
        luminanceSmoothing={0.2}
      /> */}
      <DotScreen angle={Math.PI / 6} scale={1} />
    </EffectComposer>
  );
};
