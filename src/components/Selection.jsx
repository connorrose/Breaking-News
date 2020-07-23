import React from 'react';

const Selection = ({ onSetHome }) => (
  <div id="select-settings">
    <button type="button" onClick={onSetHome}>
      Set Current Forecast as Home Break
    </button>
  </div>
);

export default Selection;
