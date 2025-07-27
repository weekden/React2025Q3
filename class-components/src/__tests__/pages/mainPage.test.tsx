import { screen, waitFor, within } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { mockByIdResponse, mockListResponse, mockRender } from '../mocks/data';

type PartialResponse = Pick<Response, 'ok' | 'status' | 'json'> &
  Partial<Pick<Response, 'statusText'>>;

describe('MainPage API integration', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render header, search, card list', () => {
    mockRender();

    expect(screen.getByTestId('title')).toBeInTheDocument();
    expect(screen.getByTestId('search')).toBeInTheDocument();
    expect(screen.getByTestId('main-container')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('should fetch and render data successfully', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockListResponse),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockByIdResponse),
      } as Response);

    mockRender('/page/1');

    await waitFor(() => {
      expect(screen.getByText('Link')).toBeInTheDocument();
      expect(screen.getByText('Zelda')).toBeInTheDocument();
    });

    const card = await screen.findByText('Link');
    expect(card).toBeInTheDocument();

    card.click();
    mockRender('/page/1/detailsId/card-1');

    await waitFor(() => {
      expect(screen.getByText('Hero of Hyrule')).toBeInTheDocument();
    });

    expect(screen.queryByLabelText('Loading...')).not.toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: 'close-details' });
    closeButton.click();

    await waitFor(() => {
      expect(screen.queryByText('Hero of Hyrule')).not.toBeInTheDocument();
    });
  });

  it('should handle client error response (4xx)', async () => {
    global.fetch = vi.fn(
      () =>
        Promise.resolve<PartialResponse>({
          ok: false,
          status: 404,
          statusText: 'Not found',
          json: () => Promise.resolve([]),
        }) as Promise<Response>
    );

    mockRender('/page/1');

    await waitFor(() => {
      expect(
        screen.getByText('Client error 404 - Not found')
      ).toBeInTheDocument();
    });

    expect(screen.queryByLabelText('Loading...')).not.toBeInTheDocument();
  });

  it('should handle client error response (5xx)', async () => {
    global.fetch = vi.fn(
      () =>
        Promise.resolve<PartialResponse>({
          ok: false,
          status: 500,
          statusText: 'Server Error',
          json: () => Promise.resolve([]),
        }) as Promise<Response>
    );

    mockRender('/page/1');

    await waitFor(() => {
      expect(
        screen.getByText('Server error 500 - Server Error')
      ).toBeInTheDocument();
    });

    expect(screen.queryByLabelText('Loading...')).not.toBeInTheDocument();
  });

  it('should show error message when fetch rejects with Error in CardDetails', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Something failed')));

    mockRender('/page/1/detailsId/card-1');
    expect(screen.queryByTestId('detail-card')).not.toBeInTheDocument();
  });

  it('should show "Unexpected error" when fetch rejects with non-Error value in CardDetails ', async () => {
    global.fetch = vi.fn(() => Promise.reject('Network down'));

    mockRender('/page/1/detailsId/card-1');
    const detailCard = await screen.findByTestId('card-details');
    await waitFor(() => {
      expect(
        within(detailCard).getByText('Unexpected error')
      ).toBeInTheDocument();
    });
  });
});
