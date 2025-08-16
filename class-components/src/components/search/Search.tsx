'use client';

import { JSX, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import useLocaleStorage from '../../hooks/localeStorage';
import Button from '../elements/Button';

import './search.css';

export default function Search(): JSX.Element {
  const [query, setQuery] = useLocaleStorage('search', '');
  const router = useRouter();

  const handleClick = (): void => {
    const trimmedQuery = query.trim();
    router.push(`?query=${encodeURIComponent(trimmedQuery)}&page=1`);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
    if (event.target.value.trim() === '') {
      router.push(`?page=1`);
    }
  };

  return (
    <div className="search-container" data-testid="search">
      <input
        type="search"
        className="input-search"
        placeholder="Enter Name"
        value={query}
        onChange={handleChange}
      />
      <Button onClick={handleClick} text="Search" />
    </div>
  );
}
