import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Spinner from '../../components/spinner/Spinner';
import { ThemeContextProvider } from '../../context/ThemeContext';

describe('Spinner component', () => {
  it('should render spinner element', () => {
    render(
      <ThemeContextProvider>
        <Spinner />
      </ThemeContextProvider>
    );
    expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
  });
});
