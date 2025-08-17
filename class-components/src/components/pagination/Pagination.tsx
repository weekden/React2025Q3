import Button from '../elements/Button';
import { Link } from '../../i18n/navigation';
import { JSX } from 'react';
import { useTranslations } from 'next-intl';

import './pagination.css';

export default function Pagination({
  currentPage,
  isLastPage,
}: {
  currentPage: number;
  isLastPage: boolean;
}): JSX.Element {
  const t = useTranslations('main');
  const prevPage = Math.max(currentPage - 1, 1);
  const nextPage = currentPage + 1;

  return (
    <div className="pagination-container">
      <Link href={`/?page=${prevPage}`} scroll={false}>
        <Button
          disabled={currentPage === 1}
          nameLocale="main"
          keyLocale="pagination.prev"
        />
      </Link>

      <span className="current-page" data-testid="current-page">
        {t('pagination.page')}: <strong>{currentPage}</strong>
      </span>

      <Link href={`/?page=${nextPage}`} scroll={false}>
        <Button
          disabled={isLastPage}
          nameLocale="main"
          keyLocale="pagination.next"
        />
      </Link>
    </div>
  );
}
