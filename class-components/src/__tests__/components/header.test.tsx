import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Header from '../../components/header/Header';

describe('Header component', () => {
  it('should render header element', () => {
    render(<Header title="Test render" />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('should display the default title if no title is specified', () => {
    render(<Header />);
    expect(screen.getByRole('heading')).toHaveTextContent('Default title');
  });

  it('should display the title', () => {
    render(<Header title="Zelda monsters store" />);
    expect(screen.getByRole('heading')).toHaveTextContent(
      'Zelda monsters store'
    );
  });
});
