import type { ReactNode } from 'react';
import type { CardProps } from '../../types/card';
import './card.css';

function Card({ name, race, description }: CardProps): ReactNode {
  return (
    <div className="card">
      <h4 className="card__name">{name}</h4>
      <p className="card__race">
        <span className="card__pretitle">Race:</span> {race || 'Unknow race'}
      </p>
      <p className="card__desc">{description}</p>
    </div>
  );
}

export default Card;
