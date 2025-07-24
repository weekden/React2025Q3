export type PaginationProps = {
  page: number;
  onPrev: () => void;
  onNext: () => void;
  isLastPage?: boolean;
};
