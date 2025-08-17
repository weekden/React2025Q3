import Title from '@/components/title/Title';
import { useTranslations } from 'next-intl';
import type { JSX } from 'react';

function About(): JSX.Element {
  const t = useTranslations('about');
  return (
    <div className="page-wrapper" data-testid="about-page">
      <Title nameLocale="about" />
      <p>{t('description')}</p>
      <p>
        Created by <strong>Denis Nedelko</strong>
      </p>
      <p>
        <a href="https://github.com/weekden/" target="blank">
          My GitHub
        </a>
      </p>
      <p>
        <a
          href="https://rs.school/courses/reactjs"
          target="blank"
          data-testid="rs-school-link"
        >
          RSS React Cours
        </a>
      </p>
    </div>
  );
}

export default About;
