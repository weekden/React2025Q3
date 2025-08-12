import type { ReactNode } from 'react';
import type { TitleProps } from '../../types/title';
import './title.css';

function Header({ title }: TitleProps): ReactNode {
  return (
    <>
      <h1 className="title" data-testid="title">
        {title || 'Default title'}
      </h1>
    </>
  );
}
export default Header;
