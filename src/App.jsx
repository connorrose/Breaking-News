/* eslint-disable react/no-unused-state */
import React, { useState, useCallback } from 'react';
import Search from './containers/Search';
import Settings from './containers/Settings';
import Report from './components/Report';
// import { useSetState } from './hooks/useSetState';

function handleLogin() {
  window.open('https://surfreport.dev/login', '_self');
}

const initialReportState = {
  surflineID: '',
  spotName: null,
  humanRelation: null,
  waterTemp: null,
  forecast: [],
};

const App = () => {
  const [reportData, setReportData] = useState(initialReportState);

  const handleSelection = useCallback((e) => {
    fetch(`/api/${e.target.id}`)
      .then((response) => response.json())
      .then((data) => {
        const { surflineID, spotName, humanRelation, waterTemp, forecast } = data;
        setReportData({ surflineID, spotName, humanRelation, waterTemp, forecast });
      })
      .catch(console.error);
  });

  const { surflineID } = reportData;

  return (
    <>
      <header>
        <h1>Surf's Up!</h1>
        <button id="login" type="button" onClick={handleLogin}>
          Login
        </button>
      </header>
      <div id="control-container">
        <Search onSelection={handleSelection} />
        <Settings currentBreak={surflineID} />
      </div>
      {surflineID && <Report reportData={reportData} />}
    </>
  );
};

export default App;
