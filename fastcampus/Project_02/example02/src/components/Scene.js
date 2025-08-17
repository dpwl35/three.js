import { useEffect, useState } from "react";
import Earth from "./Earth";
import Weather from "./Weather";
import { getCityWeather, getCurrentWeather } from "../utils/weatherApi";
import { cities } from "../utils/cities";

const API = process.env.REACT_APP_API_KEY;

const Scene = () => {
  const [content, setContent] = useState();

  const getCitiesWeather = () => {
    const promies = cities.map((city) => {
      return getCityWeather(city, API);
    });

    Promise.all(promies)
      .then((weatherDataArray) => {
        setContent(weatherDataArray);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  useEffect(() => {
    getCitiesWeather();
  }, []);

  useEffect(() => {
    console.log("도시들 데이터", content);
  }, [content]);

  return (
    <>
      <Earth position={[0, -2, 0]} />

      {content?.map((el, i) => {
        return (
          <Weather
            key={i + "Model Key"}
            position={[-1 + i * 0.5, 0, 0]}
            weather={content[i].weatherData.weather[0].main.toLowerCase()}
          />
        );
      })}

      {/* {content && (
        <>
          <Weather
            position={[0.5, 0, 0]}
            weather={content[0].weatherData.weather[0].main.toLowerCase()}
          />
          <Weather
            position={[0, 0, 0]}
            weather={content[1].weatherData.weather[0].main.toLowerCase()}
          />
          <Weather
            position={[-0.5, 0, 0]}
            weather={content[2].weatherData.weather[0].main.toLowerCase()}
          />
          <Weather
            position={[-1, 0, 0]}
            weather={content[3].weatherData.weather[0].main.toLowerCase()}
          />
          <Weather
            position={[1, 0, 0]}
            weather={content[4].weatherData.weather[0].main.toLowerCase()}
          />
        </>
      )} */}
    </>
  );
};

export default Scene;

/* content데이터가 만들어지기전에 랜딩되면 오류가떠서 content있을 때만으로 수정  */
