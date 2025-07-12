import { Component, type ErrorInfo } from 'react';
import type { ErrorBoundaryProps, ErrorBoundaryState } from '../../types/error';

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
        <div>
          <h2>Dont worry it is s a mock error</h2>
          <p>{this.state.errorMessage}</p>
          <button onClick={this.handleClick}>Back</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
