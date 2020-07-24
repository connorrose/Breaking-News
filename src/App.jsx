/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import Search from './containers/Search';
import Settings from './containers/Settings';
import Report from './components/Report';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      surflineID: '',
      spotName: null,
      humanRelation: null,
      waterTemp: null,
      forecast: [],
      user: null,
    };

    this.handleSelection = this.handleSelection.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleSelection(e) {
    const localBreak = e.target.id;

    fetch(`/api/${localBreak}`)
      .then((response) => response.json())
      .then((data) => {
        const { surflineID, spotName, humanRelation, waterTemp, forecast } = data;
        this.setState({ surflineID, spotName, humanRelation, waterTemp, forecast });
      })
      .catch((err) => console.log(err));
  }

  // eslint-disable-next-line class-methods-use-this
  handleLogin() {
    window.open('http://localhost:3000/login', '_self');
  }

  render() {
    const { surflineID } = this.state;

    return (
      <>
        <header>
          <h1>Surf's Up!</h1>
          <button id="login" type="button" onClick={this.handleLogin}>
            Login
          </button>
        </header>
        <div id="control-container">
          <Search onSelection={this.handleSelection} />
          <Settings currentBreak={surflineID} />
        </div>
        {surflineID !== '' && <Report reportData={this.state} />}
      </>
    );
  }
}

export default App;
