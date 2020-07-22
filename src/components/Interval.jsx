import React from 'react';

const Interval = ({ timestamp, surf }) => {
  const { min, max, optimalScore } = surf;
  const time = new Date(timestamp * 1000);

  return (
    <div className="interval">
      <h4>
        <em>
          {time.toLocaleDateString()}: {time.toLocaleTimeString()}
        </em>
      </h4>
      <h5>Conditions: {optimalScore === 2 ? 'Totally Tubular!' : 'Kook City...'}</h5>
      <p>Min Wave Height: {min}ft</p>
      <p>Max Wave Height: {max}ft</p>
    </div>
  );
};

export default Interval;
