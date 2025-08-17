'use client';

import Card from '../card/Card';
import { Character } from '@/types/api';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { toggleCard } from '@/store/cardsSlice';
import SelectionFlyout from '../selectionFlyout/SelectionFlyout';
import { JSX } from 'react';
import { Link } from '@/i18n/navigation';

import './card-list.css';

export default function ClientCardList({
  data,
  page,
}: {
  data: Character[];
  page: number;
}): JSX.Element {
  const checkedCardList = useAppSelector((state) => state.checkCards.list);
  const dispatch = useAppDispatch();

  const handleCheckboxChange = (id: string): void => {
    const card = data.find((item) => item.id === id);
    if (card) dispatch(toggleCard(card));
  };

  return (
    <div className="card-column">
      {data.map((card) => (
        <Link key={card.id} href={`/details/${card.id}?page=${page}`}>
          <Card
            card={card}
            isChecked={!!checkedCardList.find((item) => item.id === card.id)}
            onChange={() => handleCheckboxChange(card.id)}
            isDetail={false}
          />
        </Link>
      ))}
      {checkedCardList.length > 0 && <SelectionFlyout />}
    </div>
  );
}
