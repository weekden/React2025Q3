import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardList from '../../components/cardList/CardList';
import type { CardProps } from '../../types/card';
import { describe, expect, it } from 'vitest';

const mockData: CardProps[] = [
  {
    name: 'Anche',
    race: null,
    description: 'Anche is a character in Breath of the Wild.',
  },
  {
    name: 'Flaxel',
    race: 'Hylian',
    description: 'Flaxel is a character in Breath of the Wild.',
  },
];

describe('CardList component', () => {
  it('should render all card data fields correctly', () => {
    render(
      <CardList
        data={mockData}
        isLoading={false}
        isError={false}
        errorMessage=""
      />
    );

    mockData.forEach(({ name, race, description }) => {
      expect(screen.getByText(name)).toBeInTheDocument();

      expect(screen.getByText(description)).toBeInTheDocument();
      if (race !== null) {
        expect(screen.getByText(race)).toBeInTheDocument();
      } else {
        expect(screen.getByText('Unknow race')).toBeInTheDocument();
      }
    });
  });

  it('should render spinner element', () => {
    render(
      <CardList data={[]} isLoading={true} isError={false} errorMessage="" />
    );
    expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
  });

  it('should render not found when mockdata length === 0', () => {
    render(
      <CardList data={[]} isLoading={false} isError={false} errorMessage="" />
    );
    expect(screen.getByText('Not found')).toBeInTheDocument();
  });

  it('should render correct number of items when data is provided', () => {
    render(
      <CardList
        data={mockData}
        isLoading={false}
        isError={false}
        errorMessage=""
      />
    );
    expect(screen.getAllByRole('heading')).toHaveLength(mockData.length);
  });

  it('should show appropriate error for different HTTP status codes', () => {
    render(
      <CardList
        data={[]}
        isLoading={false}
        isError={true}
        errorMessage="Client error 404"
      />
    );
    expect(screen.getByText('Client error 404')).toBeInTheDocument();
  });
});
