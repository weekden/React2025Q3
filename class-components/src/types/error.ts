import type { ReactNode } from 'react';

export type ErrorProps = {
  onErrorGenerate: () => void;
};

export type ErrorBoundaryProps = {
  children: ReactNode;
};

export type ErrorBoundaryState = {
  hasError: boolean;
  errorMessage: string;
};
