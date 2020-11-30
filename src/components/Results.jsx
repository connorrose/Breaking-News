import React from 'react';
import ResultDisplay from './ResultDisplay';

const Results = ({ results, onSelection }) => (
  <div id="search-result-container">
    {results.length > 0 ? (
      results.map((result) => (
        <ResultDisplay key={result.surflineID} details={result} onSelection={onSelection} />
      ))
    ) : (
      <p>No results found</p>
    )}
  </div>
);

export default Results;
