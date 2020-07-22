import React from 'react';

const Searchbar = ({ value, onChange, onSearch }) => (
  <div id="searchbar-container">
    <input
      id="search-input"
      placeholder="Search for breaks by name..."
      type="text"
      value={value}
      onChange={onChange}
    />
    <button type="button" onClick={onSearch}>
      Search
    </button>
  </div>
);

export default Searchbar;
