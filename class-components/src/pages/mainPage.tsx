import Header from '../components/title/Title';
import Search from '../components/search/Search';
import CardList from '../components/cardList/CardList';
import Pagination from '../components/pagination/Pagination';
import NotFoundPage from './notFoundPage';

import { useState, type ReactNode } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useGetCharactersQuery } from '../store/apiSlice';

import './page.css';

function MainPage(): ReactNode {
  const limit = 20;
  const { page = '1' } = useParams();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const pageNumber = Number(page);
  const isInvalidPage = isNaN(pageNumber) || pageNumber <= 0;

  const { data, isLoading, isFetching, error } = useGetCharactersQuery({
    query,
    limit,
    page: pageNumber,
  });

  const totalCount = data?.count || 0;
  const isLastPage = totalCount < limit;

  const handleNextPage = (): void => {
    if (!isLastPage) {
      navigate(`/page/${pageNumber + 1}`);
    }
  };

  const handlePrevPage = (): void => {
    if (pageNumber > 1) {
      navigate(`/page/${pageNumber - 1}`);
    }
  };

  const handleSelectCard = (id: string): void => {
    navigate(`/page/${page}/detailsId/${id}`);
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
          navigate('/page/1');
        }}
      />
      <div className="main-container" data-testid="main-container">
        <CardList
          data={data?.data || []}
          isLoading={isLoading}
          isFetching={isFetching}
          error={error}
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
