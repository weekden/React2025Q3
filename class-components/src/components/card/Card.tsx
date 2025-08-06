import type { ReactNode } from 'react';
import './card.css';
import type { CardProps } from '../../types/cardList';

function Card({ card, onClick }: CardProps): ReactNode {
  return (
    <div className="card" data-id={card.id} onClick={onClick}>
      <h4 className="card__name">{card.name}</h4>
      <p className="card__race">
        <span className="card__pretitle">Race:</span>{' '}
        {card.race || 'Unknow race'}
      </p>
      {card.description && (
        <p className="card__description">
          <span className="card__pretitle">Description:</span>{' '}
          {card.description}
        </p>
      )}
    </div>
  );
}

export default Card;
