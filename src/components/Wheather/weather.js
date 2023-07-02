import React from "react";
import "./weather.css";
import moment from "moment";
import { Button } from "semantic-ui-react";
import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const weather = ({ weatherData }) => {
  const WeatherIcon = styled.div`
    color: whitesmoke;
  `;

  const refresh = () => {
    window.location.reload();
  };

  let weatherIcon = null;

  switch (weatherData?.weather[0].main) {
    case "Thunderstorm":
      weatherIcon = <FontAwesomeIcon icon={faBolt} />;
      break;
    case "Drizzle":
      weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
      break;
    case "Rain":
      weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
      break;
    case "Snow":
      weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
      break;
    case "Clear":
      weatherIcon = <FontAwesomeIcon icon={faSun} />;
      break;
    case "Clouds":
      weatherIcon = <FontAwesomeIcon icon={faCloud} />;
      break;
    default:
      weatherIcon = <FontAwesomeIcon icon={faSmog} />;
  }

  return (
    <>
      {weatherData && (
        <div className="main">
          <div className="top">
            <p className="header">{weatherData.name}</p>
            <Button
              className="button"
              inverted
              color="blue"
              circular
              icon="refresh"
              onClick={refresh}
            />
          </div>
          <div className="flex">
            <p className="day">
              {moment().format("dddd")}, <span>{moment().format("LL")}</span>
            </p>
            <div className="flex">
              <WeatherIcon style={{ fontSize: 30, marginTop: 15 }}>
                {weatherIcon}
              </WeatherIcon>
              <p className="description">{weatherData.weather[0].main}</p>
            </div>
          </div>

          <div className="flex">
            <p className="temp">Temprature: {weatherData.main.temp} &deg;C</p>
            <p className="temp">Humidity: {weatherData.main.humidity} %</p>
          </div>

          <div className="flex">
            <p className="sunrise-sunset">
              Sunrise:{" "}
              {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(
                "en-IN"
              )}
            </p>
            <p className="sunrise-sunset">
              Sunset:{" "}
              {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(
                "en-IN"
              )}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
export default weather;
