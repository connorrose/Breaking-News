import React from 'react';
import Details from './Details';
import Forecast from './Forecast';

const Report = ({ reportData: { spotName, humanRelation, waterTemp, forecast } }) => (
  <div id="report-container">
    {spotName !== null ? (
      <Details desc={humanRelation} spotName={spotName} waterTemp={waterTemp.min} />
    ) : (
      <p>Hmmm, looks like this spot is super-secret right now...</p>
    )}
    {forecast.length !== 0 && <Forecast forecast={forecast} />}
  </div>
);

export default Report;
