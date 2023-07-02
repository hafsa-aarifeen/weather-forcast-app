const getForecast = (lat, long, numOfDays) => {
  const handleResponse = (response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Please Enable your Location in your browser!");
    }
  };

  return fetch(
    `${process.env.REACT_APP_API_URL}/forecast/?lat=${lat}&lon=${long}&cnt=${numOfDays}&units=metric&&APPID=${process.env.REACT_APP_API_KEY}`
  )
    .then((res) => handleResponse(res))
    .then((forecastData) => {
      if (Object.entries(forecastData).length) {
        return forecastData;
      }
    });
};

export default getForecast;
