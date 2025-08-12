import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Header from '../../components/header/Header';

describe('Header component', () => {
  it('sould render nav links', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
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
        <Header />
      </MemoryRouter>
    );

    const homeLink = screen.getByText('Home');
    const aboutLink = screen.getByText('About');

    expect(aboutLink).toHaveClass('active');
    expect(homeLink).not.toHaveClass('active');
  });
});
