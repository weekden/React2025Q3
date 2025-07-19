import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import ErrorBoundary from '../../components/errorBoundary/ErrorBoundary';
import { Component } from 'react';

class MockErrorComponent extends Component<object> {
  constructor(props: object) {
    super(props);
    throw new Error('Simulate error');
  }
}

describe('ErrorBoundary', () => {
  it('should render children when no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should update state and render fallback UI when error', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <MockErrorComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByText("Don't worry it's a mock error")
    ).toBeInTheDocument();

    consoleError.mockRestore();
  });

  it('should reset error when on clicked button Back', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <MockErrorComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByText("Don't worry it's a mock error")
    ).toBeInTheDocument();

    const button = screen.getByRole('button');
    fireEvent.click(button);

    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    consoleError.mockRestore();
  });
});
