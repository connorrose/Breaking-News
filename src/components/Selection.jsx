import React from 'react';

const logout = function handleLogout() {
  fetch('/logout')
    .then(() => {
      // Force page refresh to clear user data from display
      window.open('http://localhost:3000', '_self');
    })
    .catch((err) => console.log(err));
};

const Selection = ({ onSetHome }) => (
  <div id="select-settings">
    <button type="button" onClick={onSetHome}>
      Set Current Forecast as Home Break
    </button>
    <br />
    <button id="logout" type="button" onClick={logout}>
      Logout
    </button>
  </div>
);

export default Selection;
