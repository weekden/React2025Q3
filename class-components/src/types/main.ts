import type { Character } from './api';

export type MainState = {
  data: Character[];
  query: string;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  isMockError: boolean;
};
