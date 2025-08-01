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
    render(<Card {...cardDefaultprops} />);
    expect(screen.getByText('Anche')).toBeInTheDocument();
  });

  it('should display the unknow race if no race is specified', () => {
    render(<Card {...cardDefaultprops} race={null} />);
    expect(screen.getByText('Unknow race')).toBeInTheDocument();
  });

  it('should add "checked" class if isChecked is true', () => {
    const { container } = render(
      <Card {...cardDefaultprops} isChecked={true} />
    );
    const label = container.querySelector('.card__check');
    expect(label).toHaveClass('checked');
  });

  it('should does not have class "checked"  if isChecked is false', () => {
    const { container } = render(
      <Card {...cardDefaultprops} isChecked={false} />
    );
    const label = container.querySelector('.card__check');
    expect(label).not.toHaveClass('checked');
  });
});
