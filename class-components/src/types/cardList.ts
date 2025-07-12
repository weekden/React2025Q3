import type { CardProps } from './card';

export type CardListProps = {
  data: CardProps[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
};
