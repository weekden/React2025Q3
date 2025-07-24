import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Title from '../../components/title/Title';

describe('Header component', () => {
  it('should render header element', () => {
    render(<Title title="Test render" />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('should display the default title if no title is specified', () => {
    render(<Title />);
    expect(screen.getByRole('heading')).toHaveTextContent('Default title');
  });

  it('should display the title', () => {
    render(<Title title="Zelda monsters store" />);
    expect(screen.getByRole('heading')).toHaveTextContent(
      'Zelda monsters store'
    );
  });
});
