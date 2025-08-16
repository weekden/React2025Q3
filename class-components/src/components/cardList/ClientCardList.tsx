'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Card from '../card/Card';
import { Character } from '@/types/api';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { toggleCard } from '@/store/cardsSlice';
import SelectionFlyout from '../selectionFlyout/SelectionFlyout';
import { JSX } from 'react';

import './card-list.css';

export default function ClientCardList({
  data,
  page,
}: {
  data: Character[];
  page: number;
}): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const checkedCardList = useAppSelector((state) => state.checkCards.list);
  const dispatch = useAppDispatch();

  const handleCheckboxChange = (id: string): void => {
    const card = data.find((item) => item.id === id);
    if (card) dispatch(toggleCard(card));
  };

  const handleClick = (id: string): void => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('page', page.toString());
    params.set('details', id);
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="card-column">
      {data.map((card) => (
        <Card
          card={card}
          key={card.id}
          isChecked={!!checkedCardList.find((item) => item.id === card.id)}
          onChange={() => handleCheckboxChange(card.id)}
          isDetail={false}
          onClick={() => handleClick(card.id)}
        />
      ))}
      {checkedCardList.length > 0 && <SelectionFlyout />}
    </div>
  );
}
