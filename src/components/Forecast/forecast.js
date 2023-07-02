import React from "react";

import { Grid, Button } from "semantic-ui-react";
import "./forecast.css";

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

const Forecast = (props) => {
  const WeatherIcon = styled.div`
    color: whitesmoke;
  `;
  const { forecast, setNumOfDays } = props;

  const mapped = [];

  const today = new Date();

  const nextSevenDays = [];

  let day = 0;

  forecast?.list.forEach((data) => {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + day);
    nextSevenDays.push(currentDate.toDateString());
    const mappedObject = {
      date: data.dt * 1000,
      description: data.weather[0].main,
      temperature: Math.round(data.main.temp),
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      clouds: data.clouds.all,
      todayDate: currentDate.toDateString(),
    };
    day = day + 1;

    mapped.push(mappedObject);
  });

  const handleViewMore = () => {
    setNumOfDays(7);
  };

  const results = mapped?.map((item, index) => {
    let weatherIcon = null;
    switch (item.description) {
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
      <div key={index} className="forecast">
        <Grid columns={1}>
          <Grid.Column>
            <p>{item.todayDate}</p>
            <div className="flex-details">
              <p>Temprature</p>
              <p>{item.temperature} &deg;C</p>
            </div>
            <div className="flex-details">
              <p>Pressure</p>
              <p>{item.pressure} hPa</p>
            </div>
            <div className="flex-details">
              <p>Humidity</p>
              <p>{item.humidity} %</p>
            </div>
            <div className="flex-details">
              <p>Cludiness</p>
              <p>{item.clouds} </p>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  });

  return (
    <div className="card">
      <div className="title">
        ForeCast
        <p>
          <Button
            class="ui button"
            floated="right"
            onClick={handleViewMore}
            content="Primary"
          >
            View More
          </Button>
        </p>
      </div>

      <Grid aria-label="forecast data">{results}</Grid>
    </div>
  );
};

export default Forecast;
