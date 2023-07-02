import React, { useEffect, useState } from "react";
import { Dimmer, Loader, Grid } from "semantic-ui-react";

import Weather from "../Wheather/weather";
import Forecast from "../Forecast/forecast";

import getForecast from "../../hooks/useGetForecast";
import getWeather from "../../hooks/useGetWeather";

import SearchForm from "../SearchForm";

import "./Display.css";

// const forecast = {
//   cod: "200",
//   message: 0,
//   cnt: 3,
//   list: [
//     {
//       dt: 1688223600,
//       main: {
//         temp: 28.66,
//         feels_like: 34.82,
//         temp_min: 26.01,
//         temp_max: 28.66,
//         pressure: 1011,
//         sea_level: 1011,
//         grnd_level: 1011,
//         humidity: 85,
//         temp_kf: 2.65,
//       },
//       weather: [
//         {
//           id: 501,
//           main: "Rain",
//           description: "moderate rain",
//           icon: "10n",
//         },
//       ],
//       clouds: {
//         all: 99,
//       },
//       wind: {
//         speed: 4.36,
//         deg: 208,
//         gust: 6.48,
//       },
//       visibility: 10000,
//       pop: 0.74,
//       rain: {
//         "3h": 4.81,
//       },
//       sys: {
//         pod: "n",
//       },
//       dt_txt: "2023-07-01 15:00:00",
//     },
//     {
//       dt: 1688234400,
//       main: {
//         temp: 27.19,
//         feels_like: 30.93,
//         temp_min: 25.79,
//         temp_max: 27.19,
//         pressure: 1011,
//         sea_level: 1011,
//         grnd_level: 1011,
//         humidity: 87,
//         temp_kf: 1.4,
//       },
//       weather: [
//         {
//           id: 501,
//           main: "Rain",
//           description: "moderate rain",
//           icon: "10n",
//         },
//       ],
//       clouds: {
//         all: 99,
//       },
//       wind: {
//         speed: 4.64,
//         deg: 213,
//         gust: 6.93,
//       },
//       visibility: 10000,
//       pop: 0.76,
//       rain: {
//         "3h": 3.57,
//       },
//       sys: {
//         pod: "n",
//       },
//       dt_txt: "2023-07-01 18:00:00",
//     },
//     {
//       dt: 1688245200,
//       main: {
//         temp: 25.67,
//         feels_like: 26.59,
//         temp_min: 25.67,
//         temp_max: 25.67,
//         pressure: 1010,
//         sea_level: 1010,
//         grnd_level: 1009,
//         humidity: 88,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 501,
//           main: "Rain",
//           description: "moderate rain",
//           icon: "10n",
//         },
//       ],
//       clouds: {
//         all: 100,
//       },
//       wind: {
//         speed: 5.56,
//         deg: 224,
//         gust: 8.09,
//       },
//       visibility: 6849,
//       pop: 0.87,
//       rain: {
//         "3h": 4.95,
//       },
//       sys: {
//         pod: "n",
//       },
//       dt_txt: "2023-07-01 21:00:00",
//     },
//   ],
//   city: {
//     id: 1248991,
//     name: "Colombo",
//     coord: {
//       lat: 6.9271,
//       lon: 79.8612,
//     },
//     country: "LK",
//     population: 648034,
//     timezone: 19800,
//     sunrise: 1688171316,
//     sunset: 1688216382,
//   },
// };

// const weatherData = {
//   coord: {
//     lon: 79.8612,
//     lat: 6.9271,
//   },
//   weather: [
//     {
//       id: 804,
//       main: "Clouds",
//       description: "overcast clouds",
//       icon: "04d",
//     },
//   ],
//   base: "stations",
//   main: {
//     temp: 29.99,
//     feels_like: 36.99,
//     temp_min: 29.99,
//     temp_max: 29.99,
//     pressure: 1010,
//     humidity: 84,
//     sea_level: 1010,
//     grnd_level: 1009,
//   },
//   visibility: 10000,
//   wind: {
//     speed: 5.13,
//     deg: 221,
//     gust: 7.23,
//   },
//   clouds: {
//     all: 98,
//   },
//   dt: 1688213028,
//   sys: {
//     type: 1,
//     id: 9098,
//     country: "LK",
//     sunrise: 1688171316,
//     sunset: 1688216382,
//   },
//   timezone: 19800,
//   id: 1248991,
//   name: "Colombo",
//   cod: 200,
// };

const Display = () => {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [numOfDays, setNumOfDays] = useState(3);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLong(longitude);
        setLat(latitude);
      },
      (error) => {
        console.error("Error:", error.message);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }

  useEffect(() => {
    getWeather(lat, long)
      .then((weather) => {
        setWeatherData(weather);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
    getForecast(lat, long, numOfDays)
      .then((data) => {
        setForecast(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [lat, long, error, numOfDays]);

  return (
    <div>
      <div className="weather-bar">
        <span className="weather-text">Weather Forecast Application</span>
      </div>

      {Object.keys(weatherData).length > 0 &&
      Object.keys(forecast).length > 0 ? (
        <div className="display-container">
          <Grid columns={2}>
            <Grid.Column>
              <SearchForm setLong={setLong} setLat={setLat} />
            </Grid.Column>
            <Grid.Column style={{ paddingRight: 50 }}>
              <div className="title"> Weather </div>
              <Weather weatherData={weatherData} />
            </Grid.Column>
          </Grid>
          <div>
            <div>
              <Forecast forecast={forecast} setNumOfDays={setNumOfDays} />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
        </div>
      )}
    </div>
  );
};
export default Display;
