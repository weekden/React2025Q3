import type { ReactNode } from 'react';
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
  const handleCheckboxChange = (id: string): void => {
    const card = data.find((item) => item.id === id);
    if (card) {
      dispatch(toggleCard(card));
    }
  };
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
        <div className="card-column" data-testid="card-list">
          {data.map((card: Character) => (
            <Card
              card={{
                id: card.id,
                name: card.name,
                race: card.race,
              }}
              key={card.id}
              onClick={() => onSelectCard(card.id)}
              isChecked={!!checkedCardList.find((item) => item.id === card.id)}
              onChange={() => handleCheckboxChange(card.id)}
            />
          ))}
          {checkedCardList.length > 0 && <SelectionFlyout />}
        </div>
      )}
    </>
  );
}

export default CardList;
