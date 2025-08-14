import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import { mockListResponse, mockRender } from '../mocks/data';
import * as api from '../../store/apiSlice';

type GetCharactersResult = ReturnType<typeof api.useGetCharactersQuery>;

describe('Test MainPage with RTK Query', () => {
  beforeEach(() => {
    vi.spyOn(api, 'useGetCharactersQuery').mockReturnValue({
      data: mockListResponse,
      isLoading: false,
      isFetching: false,
      error: undefined,
    } as Partial<GetCharactersResult> as GetCharactersResult);
  });

  it('should render components', () => {
    mockRender('/page/1');

    expect(screen.getByTestId('title')).toBeInTheDocument();
    expect(screen.getByTestId('search')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('should render list from data', () => {
    mockRender('/page/1');

    expect(screen.getByText('Link')).toBeInTheDocument();
    expect(screen.getByText('Zelda')).toBeInTheDocument();
  });

  it('shold navigate to next page when Next clicked', async () => {
    vi.spyOn(api, 'useGetCharactersQuery').mockReturnValue({
      data: { ...mockListResponse, count: 21 },
      isLoading: false,
      isFetching: false,
      error: undefined,
    } as Partial<GetCharactersResult> as GetCharactersResult);
    mockRender('/page/1');

    const nextButton = screen.getByRole('button', { name: 'Next' });
    expect(nextButton).toBeEnabled();

    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByTestId('current-page')).toHaveTextContent('Page: 2');
    });
  });

  it('should disable Next button when last page', () => {
    vi.spyOn(api, 'useGetCharactersQuery').mockReturnValue({
      data: { ...mockListResponse, count: 1 },
      isLoading: false,
      isFetching: false,
      error: undefined,
    } as Partial<GetCharactersResult> as GetCharactersResult);

    mockRender('/page/1');

    const nextButton = screen.getByRole('button', { name: 'Next' });
    expect(nextButton).toBeDisabled();
  });

  it('should navigates to details page when clicking on card', async () => {
    vi.spyOn(api, 'useGetCharacterByIdQuery').mockReturnValue({
      data: {
        data: { id: 'card-1', name: 'Link' },
      },
      isLoading: false,
      isFetching: false,
      error: undefined,
    } as Partial<ReturnType<typeof api.useGetCharacterByIdQuery>> as ReturnType<
      typeof api.useGetCharacterByIdQuery
    >);

    mockRender('/page/1');

    const card = await screen.findByText('Link');
    fireEvent.click(card);

    await waitFor(() => {
      expect(screen.getByTestId('card-details')).toBeInTheDocument();
      expect(screen.getByTestId('card-details')).toHaveTextContent('Link');
    });
  });
});
