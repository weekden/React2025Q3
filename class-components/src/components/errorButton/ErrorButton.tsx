import { Component, type ReactNode } from 'react';
import type { ErrorProps } from '../../types/error';

class ErrorButton extends Component<ErrorProps> {
  handleClick = () => {
    this.props.onErrorGenerate();
  };
  render(): ReactNode {
    return (
      <div>
        <button onClick={this.handleClick}>Error Button</button>
      </div>
    );
  }
}
export default ErrorButton;
