// weather model by (Rob Li) - https://sketchfab.com/3d-models/weather-3d-icon-visualisation-baked-cfb4c4a6af7344f985f8b0296c67988b

import { useFrame, useLoader } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { motion } from "framer-motion-3d";

const Weather = (props) => {
  const { position, weather, rotationY } = props;
  const glb = useLoader(GLTFLoader, "/models/weather.glb");

  const ref = useRef(null);

  const weatherModel = useMemo(() => {
    const clonedModel = glb.nodes[weather] || glb.nodes.cloud;
    return clonedModel.clone();
  }, [weather]);

  useFrame((_, delta) => {
    ref.current.rotation.y += delta;
  });

  return (
    <motion.mesh
      whileHover={{ scale: 1.5, transition: 0.5 }}
      ref={ref}
      rotarion-y={rotationY}
      position={position}
    >
      <primitive object={weatherModel} />
    </motion.mesh>
  );
};

export default Weather;
