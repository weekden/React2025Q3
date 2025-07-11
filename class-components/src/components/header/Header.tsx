import { Component, type ReactNode } from 'react';
import type { HeaderProps } from '../../types/header';

class Header extends Component<HeaderProps> {
  render(): ReactNode {
    const { title } = this.props;
    return (
      <>
        <h1>{title || 'Default title'}</h1>
      </>
    );
  }
}
export default Header;
