'use client';
import { useContext, type JSX } from 'react';
import './header.css';
import { Link } from '../../i18n/navigation';
import { ThemeContext } from '../../context/ThemeContext';
import { usePathname } from 'next/navigation';
import Button from '../elements/Button';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';

function Header(): JSX.Element | null {
  const context = useContext(ThemeContext);
  const pathname = usePathname();

  const t = useTranslations('header');

  if (!context) {
    return null;
  }
  const { theme, setTheme } = context;

  const toggleTheme = (): void => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="header" data-testid="header-nav">
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="nav-list__item">
            <Link
              href="/"
              className={
                pathname === '/'
                  ? 'nav-list__item-link active'
                  : 'nav-list__item-link'
              }
            >
              {t('nav.home')}
            </Link>
          </li>
          <li className="nav-list__item">
            <Link
              href="/about"
              className={
                pathname === '/about'
                  ? 'nav-list__item-link active'
                  : 'nav-list__item-link'
              }
            >
              {t('nav.about')}
            </Link>
          </li>
        </ul>
      </nav>
      <div className="header__tools">
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
