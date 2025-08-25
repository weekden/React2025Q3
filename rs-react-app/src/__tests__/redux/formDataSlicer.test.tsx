import reducer, { addFormData } from '../../store/formSlice';
import { describe, it, expect } from 'vitest';

describe('formDataSlice reducer', () => {
  const mockData = {
    name: 'Alex',
    age: 30,
    email: 'example@example.com',
    country: 'Spain',
    gender: 'male',
    password: 'qwQw12!@',
    confirmPassword: 'qwQw12!@',
    avatar: 'avatar',
    terms: true,
  };

  it('should return the initial state', () => {
    const newState = reducer(undefined, { type: '' });
    expect(newState).toEqual({ data: [] });
  });

  it('should add a form data object', () => {
    const newState = reducer({ data: [] }, addFormData(mockData));
    expect(newState.data).toEqual([mockData]);
  });
});
