import { fireEvent, screen, within } from '@testing-library/react';
import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import * as api from '../../store/apiSlice';
import {
  mockByIdResponse,
  mockRender,
  mockRenderWithTheme,
} from '../mocks/data';

type GetCharacterByIdResult = ReturnType<typeof api.useGetCharacterByIdQuery>;
type ClearCharacterCacheByIdMutationResult = ReturnType<
  typeof api.useClearCharacterCacheByIdMutation
>;

describe('CardDetails component with RTK Query', () => {
  const clearCacheMock = vi.fn();

  beforeEach(() => {
    vi.spyOn(api, 'useGetCharacterByIdQuery').mockReturnValue({
      data: mockByIdResponse,
      isLoading: false,
      isFetching: false,
      error: undefined,
    } as Partial<GetCharacterByIdResult> as GetCharacterByIdResult);

    vi.spyOn(api, 'useClearCharacterCacheByIdMutation').mockReturnValue([
      clearCacheMock,
    ] as Partial<ClearCharacterCacheByIdMutationResult> as ClearCharacterCacheByIdMutationResult);
  });

  afterEach(() => {
    clearCacheMock.mockClear();
  });

  it('should show spinner when isLoading is true', () => {
    vi.spyOn(api, 'useGetCharacterByIdQuery').mockReturnValue({
      data: undefined,
      isLoading: true,
      isFetching: false,
      error: undefined,
    } as Partial<GetCharacterByIdResult> as GetCharacterByIdResult);

    mockRenderWithTheme('/page/1/detailsId/card-1');
    const spinner = screen.getByLabelText<HTMLInputElement>('Loading...');
    expect(spinner).toBeInTheDocument();
  });

  it('should show message "Fetching data..."  when isFetching is true and isLoading is false', () => {
    vi.spyOn(api, 'useGetCharacterByIdQuery').mockReturnValue({
      data: mockByIdResponse,
      isLoading: false,
      isFetching: true,
      error: undefined,
    } as Partial<GetCharacterByIdResult> as GetCharacterByIdResult);

    mockRender('/page/1/detailsId/card-1');

    expect(screen.getByText(/Fetching data.../i)).toBeInTheDocument();
  });

  it('should render error message when error is returned', () => {
    vi.spyOn(api, 'useGetCharacterByIdQuery').mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      error: { status: 404, data: {} },
    } as Partial<GetCharacterByIdResult> as GetCharacterByIdResult);

    mockRender('/page/1/detailsId/card-2');

    expect(screen.getByText(/Client error 404/i)).toBeInTheDocument();
  });

  it('should renders cadrDetails components and test them', () => {
    vi.spyOn(api, 'useGetCharacterByIdQuery').mockReturnValue({
      data: mockByIdResponse,
      isLoading: false,
      isFetching: false,
      error: null,
    } as Partial<GetCharacterByIdResult> as GetCharacterByIdResult);

    mockRender('/page/1/detailsId/card-1');

    const container = screen.getByTestId('card-details');

    const closeButton = within(container).getByRole('button', { name: '☓' });
    const refreshButton = within(container).getByRole('button', {
      name: 'Refresh',
    });

    expect(closeButton).toBeInTheDocument();
    expect(refreshButton).toBeInTheDocument();
    expect(screen.getByText(mockByIdResponse.data.name)).toBeInTheDocument();

    fireEvent.click(refreshButton);
    expect(clearCacheMock).toHaveBeenCalledWith('card-1');

    fireEvent.click(closeButton);
    expect(screen.getByTestId('current-page')).toHaveTextContent('Page: 1');
  });
});
