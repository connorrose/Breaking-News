import React, { useState } from 'react';
import Searchbar from '../components/Searchbar';
import Results from '../components/Results';

const Search = ({ onSelection }) => {
  const [searchResult, setSearchResults] = useState(null);

  return (
    <div id="search-container">
      <h2>Search</h2>
      <Searchbar setSearchResults={setSearchResults} />
      {searchResult && <Results results={searchResult} onSelection={onSelection} />}
    </div>
  );
};

export default Search;
