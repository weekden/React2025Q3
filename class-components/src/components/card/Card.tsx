import { Component, type ReactNode } from 'react';
import type { CardProps } from '../../types/card';
import './card.css';

class Card extends Component<CardProps> {
  public render(): ReactNode {
    return (
      <>
        <div className="card">
          <h4 className="card__name">{this.props.name}</h4>
          <p className="card__race">
            <span className="card__pretitle">Race:</span>{' '}
            {this.props.race || 'Unknow race'}
          </p>
          <p className="card__desc">{this.props.description}</p>
        </div>
      </>
    );
  }
}

export default Card;
