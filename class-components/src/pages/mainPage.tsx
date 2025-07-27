import { useEffect, useState, type ReactNode } from 'react';
import Header from '../components/title/Title';
import Search from '../components/search/Search';
import CardList from '../components/cardList/CardList';
import { fetchCharacters } from '../api/getData';

import './page.css';
import type { Character } from '../types/api';
import Pagination from '../components/pagination/Pagination';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import NotFoundPage from './notFoundPage';

function MainPage(): ReactNode {
  const limit = 20;
  const { page } = useParams();
  const navigate = useNavigate();

  const pageNumber = Number(page);
  const isInvalidPage = isNaN(pageNumber) || pageNumber <= 0;

  const [data, setData] = useState<Character[]>([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(pageNumber || 1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    if (isInvalidPage) {
      return;
    }
    queryChange(query, limit, currentPage);
  }, [query, currentPage, isInvalidPage]);

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
    if (isLastPage || isError) return;
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    navigate(`/page/${nextPage}`);
  };

  const handlePrevPage = (): void => {
    if (currentPage === 1) return;
    const prevPage = currentPage - 1;
    setCurrentPage(prevPage);
    navigate(`/page/${prevPage}`);
  };

  const handleSelectCard = (id: string): void => {
    navigate(`/page/${currentPage}/detailsId/${id}`);
  };

  if (isInvalidPage) {
    return <NotFoundPage />;
  }

  return (
    <div className="page-wrapper">
      <Header title="Zelda monsters store" />
      <Search
        onQueryChange={(newQuery) => {
          setQuery(newQuery);
          setCurrentPage(1);
          navigate('/page/1');
        }}
      />
      <div className="main-container" data-testid="main-container">
        <CardList
          data={data}
          isLoading={isLoading}
          isError={isError}
          errorMessage={errorMessage}
          onSelectCard={handleSelectCard}
        />
        <Outlet />
      </div>
      <Pagination
        onPrev={handlePrevPage}
        onNext={handleNextPage}
        isLastPage={isLastPage}
      />
    </div>
  );
}

export default MainPage;
