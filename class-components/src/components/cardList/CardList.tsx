import Card from '../card/Card';
import Spinner from '../spinner/Spinner';
import SelectionFlyout from '../selectionFlyout/SelectionFlyout';
import Message from '../message/Message';

import type { JSX } from 'react';
import type { CardListProps } from '../../types/cardList';
import type { Character } from '../../types/api';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleCard } from '../../store/cardsSlice';
import { getErrorMessage } from '../../utils/getErrorMessage';

import './card-list.css';

function CardList({
  data,
  isLoading,
  isFetching,
  error,
  onSelectCard,
}: CardListProps): JSX.Element {
  const checkedCardList = useAppSelector((state) => state.checkCards.list);
  const dispatch = useAppDispatch();
  const handleCheckboxChange = (id: string): void => {
    const card = data.find((item) => item.id === id);
    if (card) {
      dispatch(toggleCard(card));
    }
  };

  if (error) {
    return <Message message={getErrorMessage(error)} />;
  }

  return (
    <>
      {(isLoading || isFetching) && (
        <div className="center-content">
          {isLoading && <Spinner />}
          {!isLoading && isFetching && <Message message="Fetching data..." />}
        </div>
      )}

      {!isLoading && !isFetching && (
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
