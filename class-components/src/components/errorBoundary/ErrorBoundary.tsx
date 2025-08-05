import { Component, type ErrorInfo, type ReactNode } from 'react';
import type { ErrorBoundaryProps, ErrorBoundaryState } from '../../types/error';
import './error-boundary.css';
import Button from '../elements/Button';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary', error, errorInfo);
  }

  public handleClick = (): void => {
    this.setState({ hasError: false, errorMessage: '' });
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="error error-container">
          <h2>Don&apos;t worry it&apos;s a mock error</h2>
          <p>{this.state.errorMessage}</p>
          <Button
            className="error__btn"
            text="Back"
            onClick={this.handleClick}
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
