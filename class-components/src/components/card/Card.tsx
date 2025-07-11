import { Component, type ReactNode } from 'react';
import type { CardProps } from '../../types/card';

class Card extends Component<CardProps> {
  render(): ReactNode {
    return (
      <>
        <div className="card">
          <h4>{this.props.name}</h4>
          <p>Race: {this.props.race || 'Unknow race'}</p>
          <p>{this.props.description}</p>
        </div>
      </>
    );
  }
}

export default Card;
