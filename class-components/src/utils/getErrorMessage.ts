import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { SerializedError } from '@reduxjs/toolkit/react';

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export function getErrorMessage(
  error: FetchBaseQueryError | SerializedError | undefined
): string {
  if (isFetchBaseQueryError(error)) {
    if (typeof error.status === 'number') {
      if (error.status >= 400 && error.status < 500) {
        return `Client error ${error.status}`;
      } else if (error.status >= 500) {
        return `Server error ${error.status}`;
      }
    } else {
      switch (error.status) {
        case 'FETCH_ERROR':
          return 'Network error.';
        case 'PARSING_ERROR':
          return 'Error parsing server response.';
      }
    }
  }

  return `Unexpected error`;
}
