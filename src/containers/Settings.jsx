import React, { Component } from 'react';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      homeBreak: null,
      days: null,
      height: null,
    };
  }

  componentDidMount() {
    fetch('/user')
      .then((response) => response.json())
      .then((user) => {
        const { username, homeBreak, days, height } = user;
        return username ? this.setState({ username, homeBreak, days, height }) : null;
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { username, homeBreak, days, height } = this.state;

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
              <p>
                <strong>Alert Lead Time: </strong>
                {days} days
              </p>
              <p>
                <strong>Alert Min Wave Height: </strong>
                {height} ft
              </p>
            </div>
            <div id="select-settings">
              <p>Settings selection will be here</p>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Settings;
