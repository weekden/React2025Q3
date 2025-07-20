import { Component, type ReactNode } from 'react';
import Card from '../card/Card';
import Spinner from '../spinner/Spinner';
import Message from '../message/Message';

import type { CardListProps } from '../../types/cardList';
import type { CardProps } from '../../types/card';
import './card-list.css';

class CardList extends Component<CardListProps> {
  public render(): ReactNode {
    return (
      <main className="main-container">
        {this.props.isLoading && (
          <div className="center-conten">
            <Spinner />
          </div>
        )}

        {this.props.isError && (
          <div className="center-content">
            <Message message={this.props.errorMessage} />
          </div>
        )}

        {!this.props.isLoading && this.props.data.length === 0 && (
          <div className="center-conten">
            <Message message="Not found" />
          </div>
        )}

        {!this.props.isLoading && (
          <div className="card-column">
            {this.props.data.map((card: CardProps, index) => (
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
}

export default CardList;
