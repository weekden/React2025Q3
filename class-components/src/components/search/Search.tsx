import { type ChangeEvent, type ReactNode } from 'react';
import type { SearchProps } from '../../types/search';
import './search.css';
import useLocaleStorage from '../../hooks/localeStorage';
import Button from '../elements/Button';

function Search({ onQueryChange }: SearchProps): ReactNode {
  const [query, setQuery] = useLocaleStorage('search', '');

  const handleClick = (): void => {
    const trimmedQuery: string = query.trim();
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
        <Button
          onClick={handleClick}
          text="Search"
          className={'button btn search__btn'}
        />
      </div>
    </>
  );
}
export default Search;
