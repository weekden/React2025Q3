import { Routes, Route, MemoryRouter } from 'react-router-dom';

import MainPage from '../../pages/mainPage';
import {
  fireEvent,
  render,
  waitFor,
  screen,
  type RenderResult,
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { mockListResponse } from '../mocks/data';

export function customRender(route = '/page/1'): RenderResult {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/page/:page" element={<MainPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Check pagination', () => {
  it('should navigate to next page when Next was clicked', async () => {
    customRender('/page/1');

    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockListResponse),
    } as Response);

    await waitFor(() => {
      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });

    const nextButton = screen.getByRole('button', { name: /Next/i });
    expect(nextButton).toBeEnabled();

    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByTestId('pagination')).toBeInTheDocument();
      expect(screen.getByTestId('current-page')).toHaveTextContent('Page: 2');
    });
  });

  it('should navigate to prew page when Prew was clicked', async () => {
    customRender('/page/2');

    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockListResponse),
    } as Response);

    await waitFor(() => {
      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });

    const prewButton = screen.getByRole('button', { name: /Prev/i });
    expect(prewButton).toBeEnabled();

    fireEvent.click(prewButton);

    await waitFor(() => {
      expect(screen.getByTestId('pagination')).toBeInTheDocument();
      expect(screen.getByTestId('current-page')).toHaveTextContent('Page: 1');
    });
  });
});
