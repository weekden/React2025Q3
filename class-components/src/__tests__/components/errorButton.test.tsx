import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import ErrorButton from '../../components/errorButton/ErrorButton';

describe('ErrorButton component', () => {
  it('should render ErrorButton element', () => {
    render(<ErrorButton onErrorGenerate={() => {}} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should generate mock error when clicked button', () => {
    const mockHandler = vi.fn();
    render(<ErrorButton onErrorGenerate={mockHandler} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockHandler).toHaveBeenCalled();
  });
});
