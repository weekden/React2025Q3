import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Spinner from '../../components/spinner/Spinner';
import { ThemeContextProvider } from '../../context/ThemeContext';
import spinnerBlack from '../../assets/spinner-black.png';
import spinnerWhite from '../../assets/spinner-white.png';

describe('Spinner component', () => {
  it('should render spinner element for light theme', () => {
    localStorage.setItem('theme', 'light');
    render(
      <ThemeContextProvider>
        <Spinner />
      </ThemeContextProvider>
    );
    const img = screen.getByLabelText<HTMLInputElement>('Loading...');
    expect(img).toBeInTheDocument();
    expect(img.src).toContain(spinnerBlack);
  });

  it('should render spinner for dark theme', () => {
    localStorage.setItem('theme', 'dark');
    render(
      <ThemeContextProvider>
        <Spinner />
      </ThemeContextProvider>
    );

    const img = screen.getByLabelText<HTMLInputElement>('Loading...');
    expect(img).toBeInTheDocument();
    expect(img.src).toContain(spinnerWhite);
  });
});
