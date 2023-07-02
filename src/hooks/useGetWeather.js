const getWeather = (lat, long) => {
  const handleResponse = (response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Please Enable your Location in your browser!");
    }
  };

  return fetch(
    `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
  )
    .then((res) => handleResponse(res))
    .then((weather) => {
      if (Object.entries(weather).length) {
        console.log("weather", weather);
        return weather;
      }
    });
};

export default getWeather;
