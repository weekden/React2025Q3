import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Header from '../../components/header/Header';
import { ThemeContextProvider } from '../../context/ThemeContext';

describe('Header component', () => {
  it('sould render nav links', () => {
    render(
      <MemoryRouter initialEntries={['/page/1']}>
        <ThemeContextProvider>
          <Header />
        </ThemeContextProvider>
      </MemoryRouter>
    );

    const homeLink = screen.getByText('Home');
    const aboutLink = screen.getByText('About');

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();

    expect(homeLink).toHaveClass('active');
    expect(aboutLink).not.toHaveClass('active');
  });

  it('should navigate to aboutPage and has to route /about', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <ThemeContextProvider>
          <Header />
        </ThemeContextProvider>
      </MemoryRouter>
    );

    const homeLink = screen.getByText('Home');
    const aboutLink = screen.getByText('About');

    expect(aboutLink).toHaveClass('active');
    expect(homeLink).not.toHaveClass('active');
  });
});
