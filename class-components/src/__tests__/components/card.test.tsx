import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Card from '../../components/card/Card';

describe('Card component', () => {
  const cardDefaultprops = {
    name: 'Anche',
    race: 'Gerudo',
    description: '',
    id: 'card-id',
  };
  it('should render card element', () => {
    render(<Card card={cardDefaultprops} />);
    expect(screen.getByText('Anche')).toBeInTheDocument();
  });

  it('should display the unknow race if no race is specified', () => {
    render(<Card card={{ ...cardDefaultprops, race: null }} />);
    expect(screen.getByText('Unknow race')).toBeInTheDocument();
  });
});
