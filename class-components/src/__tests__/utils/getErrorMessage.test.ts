import { describe, expect, it } from 'vitest';
import {
  getErrorMessage,
  isFetchBaseQueryError,
} from '../../utils/getErrorMessage';

describe('isFetchBaseQueryError', () => {
  it('should return true for object with status property', () => {
    expect(isFetchBaseQueryError({ status: 404 })).toBe(true);
    expect(isFetchBaseQueryError({ status: 'FETCH_ERROR' })).toBe(true);
  });

  it('should return false for null, undefined, or no status property', () => {
    expect(isFetchBaseQueryError(null)).toBe(false);
    expect(isFetchBaseQueryError(undefined)).toBe(false);
    expect(isFetchBaseQueryError({})).toBe(false);
    expect(isFetchBaseQueryError(100)).toBe(false);
    expect(isFetchBaseQueryError('error')).toBe(false);
  });
});

describe('getErrorMessage', () => {
  it('should return client error message for status 400-499', () => {
    expect(getErrorMessage({ status: 400, data: {} })).toBe('Client error 400');
    expect(getErrorMessage({ status: 404, data: {} })).toBe('Client error 404');
  });

  it('should return server error message for status 500 and above', () => {
    expect(getErrorMessage({ status: 500, data: {} })).toBe('Server error 500');
    expect(getErrorMessage({ status: 503, data: {} })).toBe('Server error 503');
  });

  it('should return network error message for FETCH_ERROR status', () => {
    expect(
      getErrorMessage({ status: 'FETCH_ERROR', error: 'Network error.' })
    ).toBe('Network error.');
  });

  it('should return parsing error message for PARSING_ERROR status', () => {
    expect(
      getErrorMessage({
        status: 'PARSING_ERROR',
        data: 'null',
        originalStatus: 404,
        error: 'Error parsing server response.',
      })
    ).toBe('Error parsing server response.');
  });

  it('should return unexpected error message for error without status', () => {
    expect(getErrorMessage({ message: 'just error' })).toBe('Unexpected error');
  });
});
