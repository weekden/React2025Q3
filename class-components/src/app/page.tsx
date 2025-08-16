import { fetchCharacters } from '@/api/api';

import ServerCardDetail from '@/components/cardDetail/ServerCardDetails';
import CardList from '@/components/cardList/ServerCardList';
import Pagination from '@/components/pagination/Pagination';
import Search from '@/components/search/Search';
import Spinner from '@/components/spinner/Spinner';
import Title from '@/components/title/Title';
import { JSX, Suspense } from 'react';

export default async function MainPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    details?: string;
  }>;
}): Promise<JSX.Element> {
  const searchParams = await props.searchParams;
  const pageNumber = Number(searchParams?.page) || 1;
  const detailsId = searchParams?.details || null;
  const query = searchParams?.query || '';

  const data = await fetchCharacters(query, 20, pageNumber);
  const isLastPage = data.count < 20;

  return (
    <div className="page-wrapper">
      <Title title="Zelda Monsters Store" />
      <Search />
      <div className="cards-container">
        <CardList data={data.data} page={pageNumber} />
        {detailsId && (
          <Suspense fallback={<Spinner />}>
            <ServerCardDetail id={detailsId} />
          </Suspense>
        )}
      </div>
      <Pagination currentPage={pageNumber} isLastPage={isLastPage} />
    </div>
  );
}
