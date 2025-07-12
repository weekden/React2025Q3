import { Component, type ChangeEvent, type ReactNode } from 'react';
import type { SearchProps, SearchState } from '../../types/search';
import './search.css';

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    const search = localStorage.getItem('search');
    this.state = {
      query: search || '',
    };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value }, () => {
      localStorage.setItem('search', this.state.query);
      if (this.state.query.trim().length === 0) {
        this.props.onQueryChange('');
      }
    });
  };

  handleClick = () => {
    const query = this.state.query.trim();
    if (!query) return;
    this.props.onQueryChange(query);
  };

  render(): ReactNode {
    return (
      <>
        <div className="search-container">
          <input
            type="search"
            className="input-search"
            placeholder="Enter Name"
            value={this.state.query}
            onChange={this.handleChange}
          />
          <button onClick={this.handleClick}>Search</button>
        </div>
      </>
    );
  }
}
export default Search;
