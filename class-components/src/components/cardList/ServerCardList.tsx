import { Character } from '@/types/api';
import { JSX } from 'react';
import ClientCardList from './ClientCardList';

export default function CardList({
  data,
  page,
}: {
  data: Character[];
  page: number;
}): JSX.Element {
  return <ClientCardList data={data} page={page} />;
}
