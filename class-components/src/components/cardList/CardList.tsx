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
}: CardListProps): ReactNode {
  return (
    <main className="main-container" data-testid="card-list">
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
        <div className="card-column">
          {data.map((card: Character, index) => (
            <Card
              name={card.name}
              description={card.description}
              race={card.race}
              key={index}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default CardList;
