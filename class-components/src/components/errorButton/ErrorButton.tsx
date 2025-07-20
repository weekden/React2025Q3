import { Component, type ReactNode } from 'react';
import type { ErrorProps } from '../../types/error';
import './error.css';

class ErrorButton extends Component<ErrorProps> {
  public render(): ReactNode {
    return (
      <div className="error-mock-container">
        <button onClick={this.handleClick}>Error Button</button>
      </div>
    );
  }
  private handleClick = (): void => {
    this.props.onErrorGenerate();
  };
}
export default ErrorButton;
