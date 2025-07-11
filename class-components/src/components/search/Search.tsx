import { Component, type ChangeEvent, type ReactNode } from 'react';
import type { SearchProps, SearchState } from '../../types/search';

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
    });
  };

  handleClick = async () => {
    const query = this.state.query.trim();
    // if (!query) {
    //   return;
    // }
    this.props.onQueryChange(query);
  };

  render(): ReactNode {
    return (
      <>
        <input
          type="search"
          className="input-search"
          placeholder="Enter Name"
          value={this.state.query}
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>Search</button>
      </>
    );
  }
}
export default Search;
