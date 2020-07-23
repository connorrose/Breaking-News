import React from 'react';

const ResultDisplay = ({ details, onSelection }) => (
  <div className="search-result">
    <p>
      <strong>{details.spotName}</strong>
      <br />
      <em>
        {details.state}, {details.country}
      </em>
    </p>
    <button id={details.surflineID} type="button" onClick={onSelection}>
      Select Spot
    </button>
  </div>
);

export default ResultDisplay;
