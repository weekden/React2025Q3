import { useEffect, useState, type ReactNode } from 'react';
import Header from '../components/header/Header';
import Search from '../components/search/Search';
import CardList from '../components/cardList/CardList';
import { fetchCharacters } from '../api/getData';

import './page.css';
import type { Character } from '../types/api';
import Pagination from '../components/pagination/Pagination';

function MainPage(): ReactNode {
  const limit = 20;
  const [data, setData] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    queryChange(query, limit, page);
  }, [query, page]);

  const queryChange = async (
    query: string,
    limit: number,
    page: number
  ): Promise<void> => {
    setIsLoading(true);
    setIsLastPage(false);

    try {
      const result = await fetchCharacters(query, limit, page);
      console.log(result);
      setData(result.data);
      setIsLoading(false);
      if (result.count < limit) {
        setIsLastPage(true);
      }
    } catch (error) {
      setData([]);
      setIsLoading(false);
      setIsError(true);
      setIsLastPage(true);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Unexpected error');
      }
    }
  };

  const handleNextPage = (): void => {
    if (isLastPage || isError) {
      return;
    }
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = (): void => {
    if (page === 1) {
      return;
    }
    setPage((prev) => prev - 1);
  };

  return (
    <div className="page-wrapper">
      <Header title="Zelda monsters store" />
      <Search
        onQueryChange={(newQuery) => {
          setQuery(newQuery);
          setPage(1);
        }}
      />

      <CardList
        data={data}
        isLoading={isLoading}
        isError={isError}
        errorMessage={errorMessage}
      ></CardList>
      <Pagination
        page={page}
        onPrev={handlePrevPage}
        onNext={handleNextPage}
        isLastPage={isLastPage}
      />
    </div>
  );
}

export default MainPage;
