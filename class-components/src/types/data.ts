import type { CardProps } from './card';

export type MainState = {
  data: CardProps[];
  query: string;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  isMockError: boolean;
};
