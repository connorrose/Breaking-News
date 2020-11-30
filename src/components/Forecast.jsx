import React from 'react';
import Interval from './Interval';

const Forecast = ({ forecast }) => (
  <div id="forecast-container">
    {forecast.map(({ timestamp, surf }) => (
      <Interval key={timestamp} surf={surf} timestamp={timestamp} />
    ))}
  </div>
);

export default Forecast;
