import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '../../../components/elements/Button';

describe('Button component', () => {
  it('should render with default text value', () => {
    render(<Button onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveTextContent('Click');
  });
  it('should render with  text', () => {
    render(<Button onClick={() => {}} text={'Next'} />);
    expect(screen.getByRole('button')).toHaveTextContent('Next');
  });

  it('should call onClick when button was clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
