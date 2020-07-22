import React, { Component } from 'react';
import Details from '../components/Details';
import Forecast from '../components/Forecast';

class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breakID: this.props.breakID,
      spotName: null,
      humanRelation: null,
      waterTemp: null,
      forecast: [],
    };
  }

  componentDidMount() {
    const { breakID } = this.state;

    fetch(`/api/${breakID}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const { spotName, humanRelation, waterTemp, forecast } = data;
        this.setState({ spotName, humanRelation, waterTemp, forecast });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { spotName, humanRelation, waterTemp, forecast } = this.state;

    return (
      <div id="report-container">
        {spotName !== null && (
          <Details desc={humanRelation} spotName={spotName} waterTemp={waterTemp.min} />
        )}
        {forecast.length !== 0 && <Forecast forecast={forecast} />}
      </div>
    );
  }
}

export default Report;
