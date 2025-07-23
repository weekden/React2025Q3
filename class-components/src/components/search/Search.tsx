import { useEffect, useState, type ChangeEvent, type ReactNode } from 'react';
import type { SearchProps } from '../../types/search';
import './search.css';

function Search({ onQueryChange }: SearchProps): ReactNode {
  const getValueFromLocalStorage = (): string =>
    localStorage.getItem('search') || '';

  const [query, setQuery] = useState(getValueFromLocalStorage);

  useEffect(() => {
    localStorage.setItem('search', query);
  }, [query]);

  const handleClick = (): void => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return;
    }
    onQueryChange(trimmedQuery);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const trimmedQuery = event.target.value.trim();
    setQuery(trimmedQuery);
    if (trimmedQuery === '') {
      onQueryChange('');
    }
  };

  return (
    <>
      <div className="search-container" data-testid="search">
        <input
          type="search"
          className="input-search"
          placeholder="Enter Name"
          value={query}
          onChange={handleChange}
        />
        <button onClick={handleClick}>Search</button>
      </div>
    </>
  );
}
export default Search;
