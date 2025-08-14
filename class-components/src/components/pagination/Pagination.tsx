import type { JSX } from 'react';
import type { PaginationProps } from '../../types/pagination';
import './pagination.css';
import { useParams } from 'react-router-dom';
import Button from '../elements/Button';

function Pagination({
  onPrev,
  onNext,
  isLastPage,
}: PaginationProps): JSX.Element {
  const { page } = useParams();
  return (
    <div className="pagination-container" data-testid="pagination">
      <Button
        className="button, btn-prev"
        text="Prev"
        onClick={onPrev}
        disabled={page === '1'}
      />
      <span className="current-page" data-testid="current-page">
        Page: <strong>{page}</strong>
      </span>
      <Button
        className="button, btn-next"
        text="Next"
        onClick={onNext}
        disabled={!!isLastPage}
      />
    </div>
  );
}

export default Pagination;
