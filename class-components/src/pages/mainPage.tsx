import { useEffect, useState, type ReactNode } from 'react';
import Header from '../components/title/Title';
import Search from '../components/search/Search';
import CardList from '../components/cardList/CardList';
import { fetchCharacters } from '../api/getData';

import './page.css';
import type { Character } from '../types/api';
import Pagination from '../components/pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import CardDetails from '../components/cardDetail/CardDetail';

function MainPage(): ReactNode {
  const limit = 20;
  const [data, setData] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isLastPage, setIsLastPage] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = +(searchParams.get('page') || 1);
  const detailsId = searchParams.get('details');
  const [page, setPage] = useState(pageParam);
  const [query, setQuery] = useState('');

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
    updatePage(page + 1);
  };

  const handlePrevPage = (): void => {
    if (page === 1) {
      return;
    }
    updatePage(page - 1);
  };

  const handleSelectCard = (id: string): void => {
    searchParams.set('details', id);
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  const updatePage = (newPage: number): void => {
    setPage(newPage);
    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
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
      <div className="main-container" data-testid="card-list">
        <CardList
          data={data}
          isLoading={isLoading}
          isError={isError}
          errorMessage={errorMessage}
          onSelectCard={handleSelectCard}
        ></CardList>
        {detailsId && <CardDetails />}
      </div>
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
