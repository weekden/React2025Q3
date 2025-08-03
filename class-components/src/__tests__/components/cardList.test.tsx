import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardList from '../../components/cardList/CardList';

import { describe, expect, it, vi } from 'vitest';
import type { Character } from '../../types/api';
import { Provider } from 'react-redux';
import store from '../../store';
import { ThemeContextProvider } from '../../context/ThemeContext';
import { toggleCard } from '../../store/cardsSlice';

const mockData: Character[] = [
  {
    name: 'Anche',
    race: null,
    id: '12',
  },
  {
    name: 'Flaxel',
    race: 'Hylian',
    id: '18',
  },
];

describe('CardList component', () => {
  it('should render all card data fields correctly', () => {
    render(
      <Provider store={store}>
        <ThemeContextProvider>
          <CardList
            data={mockData}
            isLoading={false}
            isError={false}
            errorMessage=""
            onSelectCard={() => {}}
          />
        </ThemeContextProvider>
      </Provider>
    );

    mockData.forEach(({ name, race }) => {
      expect(screen.getByText(name)).toBeInTheDocument();

      if (race !== null) {
        expect(screen.getByText(race)).toBeInTheDocument();
      } else {
        expect(screen.getByText('Unknow race')).toBeInTheDocument();
      }
    });
  });

  it('should render spinner element', () => {
    render(
      <Provider store={store}>
        <ThemeContextProvider>
          <CardList
            data={[]}
            isLoading={true}
            isError={false}
            errorMessage=""
            onSelectCard={() => {}}
          />
        </ThemeContextProvider>
      </Provider>
    );
    expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
  });

  it('should render not found when mockdata length === 0', () => {
    render(
      <Provider store={store}>
        <ThemeContextProvider>
          <CardList
            data={[]}
            isLoading={false}
            isError={false}
            errorMessage=""
            onSelectCard={() => {}}
          />
        </ThemeContextProvider>
      </Provider>
    );
    expect(screen.getByText('Not found')).toBeInTheDocument();
  });

  it('should render correct number of items when data is provided', () => {
    render(
      <Provider store={store}>
        <ThemeContextProvider>
          <CardList
            data={mockData}
            isLoading={false}
            isError={false}
            errorMessage=""
            onSelectCard={() => {}}
          />
        </ThemeContextProvider>
      </Provider>
    );
    expect(screen.getAllByRole('heading')).toHaveLength(mockData.length);
  });

  it('should show appropriate error for different HTTP status codes', () => {
    render(
      <Provider store={store}>
        <ThemeContextProvider>
          <CardList
            data={[]}
            isLoading={false}
            isError={true}
            errorMessage="Client error 404"
            onSelectCard={() => {}}
          />
        </ThemeContextProvider>
      </Provider>
    );
    expect(screen.getByText('Client error 404')).toBeInTheDocument();
  });

  it('should render cards and handle success click', () => {
    const handleSelectCard = vi.fn();

    render(
      <Provider store={store}>
        <ThemeContextProvider>
          <CardList
            data={mockData}
            isLoading={false}
            isError={false}
            errorMessage=""
            onSelectCard={handleSelectCard}
          />
        </ThemeContextProvider>
      </Provider>
    );

    expect(screen.getByText('Anche')).toBeInTheDocument();
    expect(screen.getByText('Flaxel')).toBeInTheDocument();
    const card = screen.getByText('Anche').closest('.card');
    if (card) {
      fireEvent.click(card);
      expect(card).toHaveAttribute('data-id', '12');
      expect(handleSelectCard).toHaveBeenCalledWith('12');
    }
  });

  it('should not call onSelectCard when clicking card without data-id', () => {
    const handleSelectCard = vi.fn();

    render(
      <Provider store={store}>
        <ThemeContextProvider>
          <CardList
            data={mockData}
            isLoading={false}
            isError={false}
            errorMessage=""
            onSelectCard={handleSelectCard}
          />
        </ThemeContextProvider>
      </Provider>
    );

    const cardList = screen.getByTestId('card-list');
    const fakeCard = document.createElement('div');
    fakeCard.className = 'card';
    cardList.append(fakeCard);

    fireEvent.click(fakeCard);
    expect(handleSelectCard).not.toHaveBeenCalled();

    fireEvent.click(cardList);
    expect(handleSelectCard).not.toHaveBeenCalled();
  });

  it('should dispatch toggleCard when clicking on checkbox', () => {
    const mockDispatch = vi.fn();
    const handleSelectCard = vi.fn();
    const originalDispatch = store.dispatch;
    store.dispatch = mockDispatch;

    render(
      <Provider store={store}>
        <ThemeContextProvider>
          <CardList
            data={mockData}
            isLoading={false}
            isError={false}
            errorMessage=""
            onSelectCard={handleSelectCard}
          />
        </ThemeContextProvider>
      </Provider>
    );

    const card = screen.getByText('Anche').closest('.card');
    expect(card).not.toBeNull();

    if (card) {
      const checkbox = card.querySelector('.card__check');
      expect(checkbox).not.toBeNull();

      if (checkbox) {
        fireEvent.click(checkbox);
        expect(mockDispatch).toHaveBeenCalledTimes(1);
      }
    }
    store.dispatch = originalDispatch;
  });

  it('should mark card as checked if it is in checkedCardList', () => {
    const handleSelectCard = vi.fn();
    store.dispatch(toggleCard(mockData[0]));

    render(
      <Provider store={store}>
        <ThemeContextProvider>
          <CardList
            data={mockData}
            isLoading={false}
            isError={false}
            errorMessage=""
            onSelectCard={handleSelectCard}
          />
        </ThemeContextProvider>
      </Provider>
    );

    const cardOne = screen.getByText('Anche').closest('.card');

    expect(cardOne).toBeInTheDocument();

    const checkboxOne = cardOne?.querySelector('.card__check');
    expect(checkboxOne).toBeInTheDocument();
    expect(checkboxOne?.classList.contains('checked')).toBe(true);
  });
});
