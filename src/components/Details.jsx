import React from 'react';

const Details = ({ desc, spotName, waterTemp }) => (
  <div id="details-container">
    <h2>Forecast</h2>
    <div id="details">
      <h4>
        Spot:
        <br />
        <p>{spotName}</p>
      </h4>
      <h4>
        Current Conditions:
        <br />
        <p>{desc}</p>
      </h4>
      <h4>
        Water Temp:
        <br />
        <p>{waterTemp}°F</p>
      </h4>
    </div>
  </div>
);

export default Details;
