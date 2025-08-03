import type { ReactNode } from 'react';
import type { PaginationProps } from '../../types/pagination';
import './pagination.css';
import { useParams } from 'react-router-dom';

function Pagination({
  onPrev,
  onNext,
  isLastPage,
}: PaginationProps): ReactNode {
  const { page } = useParams();
  return (
    <div className="pagination-container" data-testid="pagination">
      <button
        className="button btn-prev"
        onClick={onPrev}
        disabled={page === '1'}
      >
        Prev
      </button>
      <span className="current-page" data-testid="current-page">
        Page: <strong>{page}</strong>
      </span>
      <button
        className="button btn-next"
        onClick={onNext}
        disabled={isLastPage}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
