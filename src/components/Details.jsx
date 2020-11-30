import React from 'react';

const Details = ({ desc, spotName, waterTemp }) => (
  <div id="details-container">
    <h2>Forecast</h2>
    <div id="details">
      <h3>
        Spot:
        <br />
        <p>{spotName}</p>
      </h3>
      <h3>
        Current Conditions:
        <br />
        <p>{desc}</p>
      </h3>
      <h3>
        Water Temp:
        <br />
        <p>{waterTemp}°F</p>
      </h3>
    </div>
  </div>
);

export default Details;
