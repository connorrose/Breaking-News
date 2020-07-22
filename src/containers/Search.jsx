import React, { Component } from 'react';
import Searchbar from '../components/Searchbar';
import Results from '../components/Results';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      results: [],
      initialLoad: true,
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
        .then(({ results }) => this.setState({ results, query: '', initialLoad: false }))
        .catch((err) => console.log(err));
    }
  }

  render() {
    const { query, results, initialLoad } = this.state;
    const { onSelection } = this.props;

    return (
      <div id="search-container">
        <h2>Search</h2>
        <Searchbar value={query} onChange={this.handleChange} onSearch={this.handleSearch} />
        {!initialLoad && <Results results={results} onSelection={onSelection} />}
      </div>
    );
  }
}

export default Search;
