import type { Character } from './api';

export type CardListProps = {
  data: Character[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  onSelectCard: (id: string) => void;
};

export type CardProps = {
  card: Character;
  isChecked?: boolean;
  onClick?: () => void;
  onChange?: () => void;
};
