import React from 'react';
import ResultDisplay from './ResultDisplay';

const Results = ({ results }) => {
  const resultArr = results.map((result) => (
    <ResultDisplay key={result.surflineID} details={result} />
  ));

  return <div id="search-result-container">{resultArr}</div>;
};

export default Results;
