'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '../../i18n/navigation';
import { JSX } from 'react';

export default function LocaleSwitcher(): JSX.Element {
  const t = useTranslations('header');
  const pathname = usePathname();

  return (
    <div className="locals">
      <p>{t('languages.title')}</p>
      <Link
        href={pathname}
        locale="en"
        className={pathname === 'en' ? 'active-locale' : 'locale-link'}
      >
        {t('languages.en')}
      </Link>
      <Link
        href={pathname}
        locale="ru"
        className={pathname === 'ru' ? 'active-locale' : 'locale-link'}
      >
        {t('languages.ru')}
      </Link>
    </div>
  );
}
