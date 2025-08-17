import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Weather = (props) => {
  const { position, weather } = props;
  const glb = useLoader(GLTFLoader, "/models/weather.glb");
  console.log(glb.nodes);

  //   let weatherModel;
  // if (glb.nodes[weather]) {
  //   weatherModel = glb.nodes[weather].clone();
  // } else {
  //   weatherModel = glb.nodes.cloud.clone();
  // }

  const weatherModel = useMemo(() => {
    const cloneModel = glb.nodes[weather].clone() || glb.nodes.cloud.clone();
    return cloneModel.clone();
  }, [weather]);

  return (
    <mesh position={position}>
      <primitive object={weatherModel} />
    </mesh>
  );
};

export default Weather;

/* 불피요한 재계산 막기 useMemo glb 노드에 있는 여러 모델중 날씨에 해당되는 모델만 기억하게 하기 */
