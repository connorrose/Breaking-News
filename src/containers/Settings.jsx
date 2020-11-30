import React, { useEffect } from 'react';
import Selection from '../components/Selection';
import { useSetState } from '../hooks/useSetState';

const initialUserState = {
  username: null,
  homeBreak: null,
  days: null,
  height: null,
};

const Settings = ({ currentBreak }) => {
  const [userData, setUserData] = useSetState(initialUserState);

  useEffect(() => {
    fetch('/user')
      .then((response) => response.json())
      .then((user) => {
        const { username, homeBreak, days, height } = user;
        if (username) {
          setUserData({ username, days, height, homeBreak: homeBreak.breakName });
        }
      })
      .catch(console.error);
  }, []);

  const handleSetHome = () => {
    if (!currentBreak) {
      // eslint-disable-next-line no-alert
      alert('No break selected!\nUse the search feature to find a break.');
    } else {
      fetch(`/user/break/${currentBreak}`, { method: 'POST' })
        .then((response) => response.json())
        .then((data) => {
          const { homeBreak } = data;
          if (homeBreak) setUserData({ homeBreak });
        })
        .catch(console.error);
    }
  };

  const { username, homeBreak, days, height } = userData;

  return (
    <div id="settings-container">
      <h2>Settings</h2>
      {username && (
        <>
          <p id="greeting">Welcome, {username}!</p>
          <div id="current-settings">
            <p>
              <strong>Home Break: </strong>
              {homeBreak || 'None selected'}
            </p>
            <p id="alert-lead">
              <strong>Alert Lead Time: </strong>
              {days} days
            </p>
            <p>
              <strong>Alert Min Wave Height: </strong>
              {height} ft
            </p>
          </div>
          <Selection onSetHome={handleSetHome} />
        </>
      )}
    </div>
  );
};

export default Settings;
