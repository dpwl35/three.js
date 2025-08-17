import { useEffect } from "react";
import Earth from "./Earth";
import Weather from "./Weather";
import { getCurrentWeather } from "../utils/weatherApi";

const Scene = () => {
  useEffect(() => {
    getCurrentWeather(44.34, 10.99, process.env.REACT_APP_API_KEY);
  }, []);
  return (
    <>
      <Earth position={[0, -2, 0]} />
      <Weather position={[0.5, 0, 0]} weather={"rain"} />
      <Weather position={[0, 0, 0]} weather={"clear"} />
      <Weather position={[-0.5, 0, 0]} weather={"snow"} />
    </>
  );
};

export default Scene;
