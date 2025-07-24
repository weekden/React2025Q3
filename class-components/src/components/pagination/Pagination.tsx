import type { ReactNode } from 'react';
import type { PaginationProps } from '../../types/pagination';
import './pagination.css';

function Pagination({
  page,
  onPrev,
  onNext,
  isLastPage,
}: PaginationProps): ReactNode {
  return (
    <div className="pagination-container" data-testid="pagination">
      <button
        className="button, btn-prev"
        onClick={onPrev}
        disabled={page === 1}
      >
        Prev
      </button>
      <span className="current-page">{page}</span>
      <button
        className="button, btn-next"
        onClick={onNext}
        disabled={isLastPage}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
