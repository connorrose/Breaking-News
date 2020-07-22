import React from 'react';

const Interval = ({ timestamp, surf }) => {
  const { min, max, optimalScore } = surf;
  const time = new Date(timestamp * 1000);

  return (
    <div className="interval">
      <p>
        <strong>
          {time.toLocaleDateString()}
          <br />
          <br />
          {time.toLocaleTimeString()}
        </strong>
      </p>
      <p>
        <strong>Conditions:</strong>
        <br />
        <br />
        {optimalScore === 2 ? (
          <span className="tubular">Totally Tubular!</span>
        ) : (
          <span className="kook">Kook City...</span>
        )}
      </p>
      <p>
        <strong>Min Wave Height:</strong>
        <br />
        <br />
        {min} ft
      </p>
      <p>
        <strong>Max Wave Height:</strong>
        <br />
        <br />
        {max} ft
      </p>
    </div>
  );
};

export default Interval;
