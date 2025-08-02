import { type ReactNode } from 'react';
import Card from '../card/Card';
import Spinner from '../spinner/Spinner';
import Message from '../message/Message';

import type { CardListProps } from '../../types/cardList';
import './card-list.css';
import type { Character } from '../../types/api';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleCard } from '../../store/cardsSlice';
import SelectionFlyout from '../selectionFlyout/SelectionFlyout';

function CardList({
  data,
  isLoading,
  isError,
  errorMessage,
  onSelectCard,
}: CardListProps): ReactNode {
  const checkedCardList = useAppSelector((state) => state.checkCards.list);
  const dispatch = useAppDispatch();

  return (
    <>
      {isLoading && (
        <div className="center-conten">
          <Spinner />
        </div>
      )}

      {isError && (
        <div className="center-content">
          <Message message={errorMessage} />
        </div>
      )}

      {!isLoading && data.length === 0 && (
        <div className="center-conten">
          <Message message="Not found" />
        </div>
      )}

      {!isLoading && (
        <div
          className="card-column"
          data-testid="card-list"
          onClick={(event) => {
            const target = event.target as HTMLElement;

            if (target.closest('.card__check')) {
              const card = target.closest('.card');
              const id = card?.getAttribute('data-id');
              event.preventDefault();
              if (id) {
                const character = data.find((item) => item.id === id);
                if (character) {
                  dispatch(toggleCard(character));
                }
              }
              return;
            }

            if (target.closest('.card')) {
              const card = target.closest('.card');
              const id = card?.getAttribute('data-id');
              if (id) {
                onSelectCard(id);
              }
            }
          }}
        >
          {data.map((card: Character) => (
            <Card
              name={card.name}
              race={card.race}
              key={card.id}
              id={card.id}
              isChecked={!!checkedCardList.find((item) => item.id === card.id)}
            />
          ))}
          {checkedCardList.length > 0 && <SelectionFlyout />}
        </div>
      )}
    </>
  );
}

export default CardList;
