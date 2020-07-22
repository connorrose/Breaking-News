// App component logic
import React, { Component } from 'react';
import Search from './containers/Search';
import Report from './containers/Report';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      localBreak: '',
    };

    this.handleSelection = this.handleSelection.bind(this);
  }

  handleSelection(e) {
    this.setState({ localBreak: e.target.id });
  }

  render() {
    const { localBreak } = this.state;

    return (
      <>
        <h5>React App Rendered</h5>
        <Search onSelection={this.handleSelection} />
        {localBreak !== '' && <Report breakID={localBreak} />}
      </>
    );
  }
}

export default App;
