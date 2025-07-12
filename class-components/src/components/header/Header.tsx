import { Component, type ReactNode } from 'react';
import type { HeaderProps } from '../../types/header';
import './header.css';

class Header extends Component<HeaderProps> {
  render(): ReactNode {
    const { title } = this.props;
    return (
      <>
        <h1 className="header">{title || 'Default title'}</h1>
      </>
    );
  }
}
export default Header;
