'use client';
import Title from '../title/Title';
import Search from '../search/Search';
import Pagination from '@/components/pagination/Pagination';
import ServerCardList from '../cardList/ServerCardList';

import { JSX } from 'react';
import { Character } from '@/types/api';

type ClientMainPageProps = {
  data: {
    data: Character[];
    count: number;
  };
  page: number;
  detailsId?: string | null;
  isLastPage: boolean;
};

export default function ClientMainPage({
  data,
  page,

  isLastPage,
}: ClientMainPageProps): JSX.Element {
  return (
    <div className="page-wrapper">
      <Title nameLocale="main" />
      <Search />
      <div className="cards-container">
        <ServerCardList data={data.data} page={page} />
      </div>
      <Pagination currentPage={page} isLastPage={isLastPage} />
    </div>
  );
}
