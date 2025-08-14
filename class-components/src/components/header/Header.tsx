import { useContext, type JSX } from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';
import { ThemeContext } from '../../context/ThemeContext';

function Header(): JSX.Element | null {
  const context = useContext(ThemeContext);
  if (!context) {
    return null;
  }

  const toggleTheme = (): void => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  const { theme, setTheme } = context;
  return (
    <header className="header" data-testid="header-nav">
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="nav-list__item">
            <NavLink
              className={({ isActive }) =>
                isActive ? 'nav-list__item-link active' : 'nav-list__item-link'
              }
              to="/page/1"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-list__item">
            <NavLink
              className={({ isActive }) =>
                isActive ? 'nav-list__item-link active' : 'nav-list__item-link'
              }
              to="about"
            >
              About
            </NavLink>
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
