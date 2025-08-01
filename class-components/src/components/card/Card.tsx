import type { ReactNode } from 'react';
import type { Character } from '../../types/api';
import './card.css';

function Card({
  name,
  race,
  id,
  description,
  isChecked,
}: Character): ReactNode {
  return (
    <div className="card" data-id={id}>
      <h4 className="card__name">{name}</h4>
      <p className="card__race">
        <span className="card__pretitle">Race:</span> {race || 'Unknow race'}
      </p>
      {description && (
        <p className="card__description">
          <span className="card__pretitle">Description:</span> {description}
        </p>
      )}
      {!description && (
        <p className="card__control">
          <input type="checkbox" checked={isChecked} readOnly />
        </p>
      )}
    </div>
  );
}

export default Card;
