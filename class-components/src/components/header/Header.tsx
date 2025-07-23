import type { ReactNode } from 'react';
import type { HeaderProps } from '../../types/header';
import './header.css';

function Header({ title }: HeaderProps): ReactNode {
  return (
    <>
      <h1 className="header" data-testid="header">
        {title || 'Default title'}
      </h1>
    </>
  );
}
export default Header;
