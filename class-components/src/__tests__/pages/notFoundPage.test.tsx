import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import NotFoundPage from '../../pages/notFoundPage';

describe('NotFoundPage', () => {
  it('should render NotFoundPage', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    const linkToHome = screen.getByRole('link');
    expect(screen.getByText("This page doesn't exist.")).toBeInTheDocument();
    expect(linkToHome).toBeInTheDocument();
    expect(linkToHome).toHaveAttribute('href', '/');
  });
});
