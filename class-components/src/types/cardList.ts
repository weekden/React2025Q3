import type { Character } from './api';

export type CardListProps = {
  data: Character[];
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
  onSelectCard: (id: string) => void;
};

export type CardProps = {
  card: Character;
  isChecked?: boolean;
  isDetail: boolean;
  onClick?: () => void;
  onChange?: () => void;
};
