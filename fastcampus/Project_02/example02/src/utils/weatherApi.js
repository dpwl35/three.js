const getCurrentWeather = (lat, lon, key) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.log("error");
    });
};

export { getCurrentWeather };
