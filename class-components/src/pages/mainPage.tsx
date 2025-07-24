import { useEffect, useState, type ReactNode } from 'react';
import Header from '../components/header/Header';
import Search from '../components/search/Search';
import CardList from '../components/cardList/CardList';
import { fetchCharacters } from '../api/getData';

import './page.css';
import type { Character } from '../types/api';

function MainPage(): ReactNode {
  const [data, setData] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    queryChange('');
  }, []);

  const queryChange = async (query: string): Promise<void> => {
    setIsLoading(true);

    try {
      const result = await fetchCharacters(query);
      console.log(result);
      setData(result.data);
      setIsLoading(false);
    } catch (error) {
      setData([]);
      setIsLoading(false);
      setIsError(true);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Unexpected error');
      }
    }
  };

  return (
    <div className="page-wrapper">
      <Header title="Zelda monsters store" />
      <Search onQueryChange={queryChange} />

      <CardList
        data={data}
        isLoading={isLoading}
        isError={isError}
        errorMessage={errorMessage}
      ></CardList>
    </div>
  );
}

export default MainPage;
