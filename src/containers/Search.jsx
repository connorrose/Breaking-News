import React, { Component } from 'react';
import Searchbar from '../components/Searchbar';
import Results from '../components/Results';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      results: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(e) {
    this.setState({ query: e.target.value });
  }

  handleSearch() {
    let { query } = this.state;
    // console.log('Handling search...');

    if (query !== '') {
      query = query.split(' ').join('%20');
      // console.log('Sending search request...');

      fetch(`/search?spot=${query}`)
        .then((response) => response.json())
        .then(({ results }) => this.setState({ results, query: '' }))
        .catch((err) => console.log(err));
    }
  }

  render() {
    const { query, results } = this.state;
    const { onSelection } = this.props;

    return (
      <>
        <Searchbar value={query} onChange={this.handleChange} onSearch={this.handleSearch} />
        {results.length > 0 ? (
          <Results results={results} onSelection={onSelection} />
        ) : (
          <p>No matching results...</p>
        )}
      </>
    );
  }
}

export default Search;
