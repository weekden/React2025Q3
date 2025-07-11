import { Component } from 'react';

import type { CardListProps } from '../../types/cardList';
import Card from '../card/Card';
import type { CardProps } from '../../types/card';
import Spinner from '../spinner/Spinner';
import Message from '../message/Message';

// type ErrorMessage = { isError: boolean; errorMessage: string };

class CardList extends Component<CardListProps> {
  render() {
    // if (this.state.isError) {
    //   return (
    //     <ErrorBoundryComponent message="{props.errorMessager}"></ErrorBoundryComponent>
    //   );
    // }

    return (
      <main className="main-container">
        {this.props.isLoading && <Spinner />}
        {this.props.data.length === 0 && <Message message="Not found" />}
        {!this.props.isLoading &&
          this.props.data.map((card: CardProps, index) => (
            <Card
              name={card.name}
              description={card.description}
              race={card.race}
              key={index}
            />
          ))}
      </main>
    );
  }
}

export default CardList;
