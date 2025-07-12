import { Component, type ErrorInfo } from 'react';
import type { ErrorBoundaryProps, ErrorBoundaryState } from '../../types/error';
import './error-boundary.css';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary', error, errorInfo);
  }

  handleClick = () => {
    this.setState({ hasError: false, errorMessage: '' });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error error-container">
          <h2>Don&apos;t worry it&apos;s a mock error</h2>
          <p>{this.state.errorMessage}</p>
          <button className="error__btn" onClick={this.handleClick}>
            Back
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
