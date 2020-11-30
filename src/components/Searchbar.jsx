import React, { useState } from 'react';

const Searchbar = ({ setSearchResults }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query !== '') {
      const UrlSafeQuery = query.split(' ').join('%20');

      fetch(`/search?spot=${UrlSafeQuery}`)
        .then((response) => response.json())
        .then(({ results }) => {
          setSearchResults(results);
          setQuery('');
        })
        .catch(console.error);
    }
  };

  return (
    <div id="searchbar-container">
      <label htmlFor="search-input">
        Search for breaks by name
        <input
          id="search-input"
          placeholder="Peahi"
          type="search"
          value={query}
          onChange={handleChange}
        />
      </label>
      <button type="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Searchbar;
