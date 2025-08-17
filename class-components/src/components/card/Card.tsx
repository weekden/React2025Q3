import type { JSX } from 'react';
import type { CardProps } from '../../types/cardList';
import { useTranslations } from 'next-intl';

import './card.css';

function Card({
  card,
  onClick,
  onChange,
  isChecked,
  isDetail,
}: CardProps): JSX.Element {
  const t = useTranslations('main');
  return (
    <div className="card" data-id={card.id} onClick={onClick}>
      <h4 className="card__name">{card.name}</h4>
      <p className="card__race">
        <span className="card__pretitle">Race:</span>{' '}
        {card.race || 'Unknow race'}
      </p>
      {isDetail && (
        <p className="card__description">
          <span className="card__pretitle">Description:</span>{' '}
          {card.description}
        </p>
      )}
      {!isDetail && (
        <label
          className={`card__check ${isChecked ? 'checked' : ''}`}
          onClick={(event) => event.stopPropagation()}
        >
          <input type="checkbox" onChange={onChange} hidden />
          {isChecked ? t('cards.uncheck') : t('cards.check')}
        </label>
      )}
    </div>
  );
}

export default Card;
