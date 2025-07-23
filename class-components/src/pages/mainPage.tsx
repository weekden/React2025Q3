import { useEffect, useState, type ReactNode } from 'react';
import Header from '../components/header/Header';
import Search from '../components/search/Search';
import CardList from '../components/cardList/CardList';
import ErrorButton from '../components/errorButton/ErrorButton';
import './page.css';
import type { CardProps } from '../types/card';

function MainPage(): ReactNode {
  const [data, setData] = useState<CardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isMockError, setIsMockError] = useState(false);

  useEffect(() => {
    queryChange('');
  }, []);

  const queryChange = async (query: string): Promise<void> => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://zelda.fanapis.com/api/characters?name=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        if (response.status >= 400 && response.status < 500) {
          setErrorMessage(
            `Client error ${response.status} - ${response.statusText}`
          );
        } else if (response.status >= 500) {
          setErrorMessage(
            `Server error ${response.status} - ${response.statusText}`
          );
        }

        setData([]);
        setIsLoading(false);
        setIsError(true);
        return;
      }

      const result = await response.json();
      setData(result);

      setData(result.data);
      setIsLoading(false);
      setIsError(false);
    } catch {
      setData([]);
      setIsLoading(false);
      setIsError(true);
      setErrorMessage('Unexpected error');
    }
  };

  const errorGenerate = (): void => {
    setIsMockError(true);
  };

  if (isMockError) {
    throw new Error('This is mock error');
  }

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

      <ErrorButton onErrorGenerate={errorGenerate} />
    </div>
  );
}

export default MainPage;
