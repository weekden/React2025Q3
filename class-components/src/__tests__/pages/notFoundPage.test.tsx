import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import NotFoundPage from '../../pages/notFoundPage';
import { mockRender } from '../mocks/data';

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

  it('should render NotFoundPage for invalid page parameter', async () => {
    mockRender('/page/abc');

    await waitFor(() => {
      expect(screen.getByText("This page doesn't exist.")).toBeInTheDocument();
    });
  });
});
