import type { ReactNode } from 'react';
import Card from '../card/Card';
import Spinner from '../spinner/Spinner';
import Message from '../message/Message';

import type { CardListProps } from '../../types/cardList';
import './card-list.css';
import type { Character } from '../../types/api';

function CardList({
  data,
  isLoading,
  isError,
  errorMessage,
  onSelectCard,
}: CardListProps): ReactNode {
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
          onClick={(event) => {
            const card = (event.target as HTMLElement).closest('.card');
            if (card) {
              const id = card.getAttribute('data-id');
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
            />
          ))}
        </div>
      )}
    </>
  );
}

export default CardList;
