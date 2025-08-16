import Link from 'next/link';
import { JSX } from 'react';
import './pagination.css';
import Button from '../elements/Button';

export default function Pagination({
  currentPage,
  isLastPage,
}: {
  currentPage: number;
  isLastPage: boolean;
}): JSX.Element {
  const prevPage = Math.max(currentPage - 1, 1);
  const nextPage = currentPage + 1;

  return (
    <div className="pagination-container">
      <Link href={`/?page=${prevPage}`}>
        <Button disabled={currentPage === 1} text="Prev" />
      </Link>

      <span className="current-page" data-testid="current-page">
        Page: <strong>{currentPage}</strong>
      </span>

      <Link href={`/?page=${nextPage}`}>
        <Button disabled={isLastPage} text="Next" />
      </Link>
    </div>
  );
}
