import type { ReactNode } from 'react';
import './card.css';
import type { CardProps } from '../../types/cardList';

function Card({ card, onClick, onChange, isChecked }: CardProps): ReactNode {
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
      {!card.description && (
        <label
          className={`card__check ${isChecked ? 'checked' : ''}`}
          onClick={(event) => event.stopPropagation()}
        >
          <input type="checkbox" onChange={onChange} hidden />
          {isChecked ? 'Uncheck' : 'Check'}
        </label>
      )}
    </div>
  );
}

export default Card;
