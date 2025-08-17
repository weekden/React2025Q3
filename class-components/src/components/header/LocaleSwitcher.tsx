'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '../../i18n/navigation';
import { JSX } from 'react';

import styles from './LocaleSwitcher.module.css';

export default function LocaleSwitcher(): JSX.Element {
  const t = useTranslations('header');
  const pathname = usePathname();

  return (
    <div className={styles.locals}>
      <p>{t('languages.title')}</p>
      <p>
        <Link href={pathname} locale="en" className={styles['locale-link']}>
          {t('languages.en')}
        </Link>
        <Link href={pathname} locale="ru" className={styles['locale-link']}>
          {t('languages.ru')}
        </Link>
      </p>
    </div>
  );
}
