import type { JSX } from 'react';
import type { TitleProps } from '../../types/title';
import { useTranslations } from 'next-intl';

import './title.css';

function Title({ title, nameLocale = 'main' }: TitleProps): JSX.Element {
  const t = useTranslations(nameLocale);
  return (
    <h1 className="title" data-testid="title">
      {title || t('title') || 'Default title'}
    </h1>
  );
}
export default Title;
