import React from 'react';
import Interval from './Interval';

const Forecast = ({ forecast }) => {
  const forecastArr = forecast.map((interval) => {
    const { timestamp, surf } = interval;

    return <Interval key={timestamp} surf={surf} timestamp={timestamp} />;
  });

  return <div id="forecast-container">{forecastArr}</div>;
};

export default Forecast;
