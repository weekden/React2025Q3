import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';

function Header(): ReactNode {
  return (
    <header className="header" data-testid="header-nav">
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="nav-list__item">
            <NavLink
              className={({ isActive }) =>
                isActive ? 'nav-list__item-link active' : 'nav-list__item-link'
              }
              to="/"
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
    </header>
  );
}
export default Header;
