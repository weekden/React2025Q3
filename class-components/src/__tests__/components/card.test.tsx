import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Card from '../../components/card/Card';
import type { CardProps } from '../../types/card';

describe('Card component', () => {
  const cardDefaultprops: CardProps = {
    name: 'Anche',
    race: 'Gerudo',
    description: 'Anche is a character in Breath of the Wild.',
  };
  it('should render card element', () => {
    render(<Card {...cardDefaultprops} />);
    expect(screen.getByText('Anche')).toBeInTheDocument();
  });

  it('should display the unknow race if no race is specified', () => {
    render(
      <Card
        name={cardDefaultprops.name}
        race={null}
        description={cardDefaultprops.description}
      />
    );
    expect(screen.getByText('Unknow race')).toBeInTheDocument();
  });
});
