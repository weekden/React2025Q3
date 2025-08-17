import Title from '@/components/title/Title';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import type { JSX } from 'react';

function NotFoundPage(): JSX.Element {
  const t = useTranslations('404');
  return (
    <div
      style={{
        margin: 'auto',
        textAlign: 'center',
      }}
    >
      <Title nameLocale="404" />
      <p>{t('message')}</p>
      <p>
        <Link href="/">{t('back')}</Link>
      </p>
    </div>
  );
}

export default NotFoundPage;
