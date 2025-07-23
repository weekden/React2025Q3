import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import MainPage from '../../pages/mainPage';

type PartialResponse = Pick<Response, 'ok' | 'status' | 'json'> &
  Partial<Pick<Response, 'statusText'>>;

describe('MainPage API integration', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render header, search, card list, and error button', () => {
    render(<MainPage />);

    expect(screen.getByText('Zelda monsters store')).toBeInTheDocument();
    expect(screen.getByTestId('search')).toBeInTheDocument();
    expect(screen.getByTestId('card-list')).toBeInTheDocument();
    expect(screen.getByTestId('error-button')).toBeInTheDocument();
  });

  it('should fetch and render data successfully', async () => {
    const mockResponse = {
      data: [
        { name: 'Link', race: 'Hylian', description: 'Hero of Hyrule' },
        { name: 'Zelda', race: 'Hylian', description: 'Princess of Hyrule' },
      ],
    };

    global.fetch = vi.fn(
      () =>
        Promise.resolve<PartialResponse>({
          ok: true,
          status: 200,
          json: () => Promise.resolve(mockResponse),
        }) as Promise<Response>
    );

    render(<MainPage />);

    await waitFor(() => {
      expect(screen.getByText('Link')).toBeInTheDocument();
      expect(screen.getByText('Zelda')).toBeInTheDocument();
    });

    expect(screen.queryByLabelText('Loading...')).not.toBeInTheDocument();
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

    render(<MainPage />);

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

    render(<MainPage />);

    await waitFor(() => {
      expect(
        screen.getByText('Server error 500 - Server Error')
      ).toBeInTheDocument();
    });

    expect(screen.queryByLabelText('Loading...')).not.toBeInTheDocument();
  });

  it('should throw error when isMockError is true', () => {
    class MockMainPage extends MainPage {
      constructor(props: object) {
        super(props);
        this.state = {
          ...this.state,
          isMockError: true,
        };
      }
    }

    expect(() => render(<MockMainPage />)).toThrow('This is mock error');
  });
});
