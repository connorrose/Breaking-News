import React, { Component } from 'react';
import Selection from '../components/Selection';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      homeBreak: null,
      days: null,
      height: null,
    };

    this.handleSetHome = this.handleSetHome.bind(this);
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

  handleSetHome() {
    const { currentBreak } = this.props;
    if (!currentBreak) {
      // eslint-disable-next-line no-alert
      alert('No break selected!\nUse the search feature to find a break.');
    } else {
      fetch(`/user/break/${currentBreak}`, { method: 'POST' })
        .then((response) => response.json())
        .then((data) => {
          const { homeBreak } = data;
          return this.setState(
            homeBreak ? { homeBreak } : { homeBreak: "Couldn't fetch break name" }
          );
        })
        .catch((err) => console.log(err));
    }
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
              <p id="alert-lead">
                <strong>Alert Lead Time: </strong>
                {days} days
              </p>
              <p>
                <strong>Alert Min Wave Height: </strong>
                {height} ft
              </p>
            </div>
            <Selection onSetHome={this.handleSetHome} />
          </>
        )}
      </div>
    );
  }
}

export default Settings;
