import React from 'react';

const Details = ({ desc, spotName, waterTemp }) => (
  <div id="details-container">
    <h4>{spotName}</h4>
    <p>Current Conditions: {desc}</p>
    <p>Water Temp: {waterTemp}</p>
  </div>
);

export default Details;
