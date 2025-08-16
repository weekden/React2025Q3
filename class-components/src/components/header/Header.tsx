import { useContext, type JSX } from 'react';
import Link from 'next/link';
import './header.css';

import { ThemeContext } from '../../context/ThemeContext';
import { usePathname } from 'next/navigation';

function Header(): JSX.Element | null {
  const context = useContext(ThemeContext);
  const pathname = usePathname();
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
              Home
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
              About
            </Link>
          </li>
        </ul>
      </nav>
      <div className="header__tools">
        <button onClick={toggleTheme}>
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </div>
    </header>
  );
}
export default Header;
