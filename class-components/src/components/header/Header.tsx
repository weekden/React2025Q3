'use client';
import { useContext, type JSX } from 'react';
import { Link } from '../../i18n/navigation';
import { ThemeContext } from '../../context/ThemeContext';
import Button from '../elements/Button';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';

import styles from './Header.module.css';

function Header(): JSX.Element | null {
  const context = useContext(ThemeContext);
  const t = useTranslations('header');

  if (!context) {
    return null;
  }
  const { theme, setTheme } = context;

  const toggleTheme = (): void => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <ul className={styles.header__navList}>
          <li className={styles.navList__item}>
            <Link href="/" className={styles.navList__itemLink}>
              {t('nav.home')}
            </Link>
          </li>
          <li className="nav-list__item">
            <Link href="/about" className={styles.navList__itemLink}>
              {t('nav.about')}
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.header__tools}>
        <Button
          onClick={toggleTheme}
          nameLocale="header.theme"
          keyLocale={theme === 'light' ? 'dark' : 'light'}
        />
        <LocaleSwitcher />
      </div>
    </header>
  );
}
export default Header;
