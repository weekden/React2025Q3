import {
  render,
  screen,
  waitFor,
  within,
  type RenderResult,
} from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import MainPage from '../../pages/mainPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CardDetails from '../../components/cardDetail/CardDetail';

type PartialResponse = Pick<Response, 'ok' | 'status' | 'json'> &
  Partial<Pick<Response, 'statusText'>>;

const mockListResponse = {
  data: [
    {
      name: 'Link',
      race: 'Hylian',
      description: 'Hero of Hyrule',
      id: 'card-1',
    },
    {
      name: 'Zelda',
      race: 'Hylian',
      description: 'Princess of Hyrule',
      id: 'card-2',
    },
  ],
};

const mockByIdResponse = {
  success: true,
  data: {
    id: 'card-1',
    name: 'Link',
    race: 'Hylian',
    description: 'Hero of Hyrule',
  },
};

const mockRender = (defaultPath: string = '/page/1'): RenderResult => {
  return render(
    <MemoryRouter initialEntries={[defaultPath]}>
      <Routes>
        <Route path="/page/:page" element={<MainPage />}>
          <Route path="detailsId/:id" element={<CardDetails />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};

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
