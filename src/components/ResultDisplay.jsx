import React from 'react';

const ResultDisplay = ({ details }) => (
  <div>
    <p>
      <strong>{details.spotName}</strong>
      <br />
      {'Location: '}
      <em>
        {details.state}, {details.country}
      </em>
    </p>
    <button id={details.surflineID} type="button">
      Select Spot
    </button>
  </div>
);

export default ResultDisplay;
