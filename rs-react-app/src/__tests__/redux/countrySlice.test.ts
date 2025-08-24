import reducer, { setCountry } from '../../store/countrySlice';
import { describe, it, expect } from 'vitest';

export const countryList = [
  'Belarus',
  'Finland',
  'Greece',
  'Australia',
  'Argentina',
  'Brazil',
  'Austria',
  'United States',
  'Canada',
  'Germany',
  'France',
  'Italy',
  'Spain',
  'United Kingdom',
  'Poland',
  'Ukraine',
  'Japan',
  'China',
  'India',
];

describe('countrySlice reducer', () => {
  it('should return the initial state', () => {
    const newState = reducer(undefined, { type: '' });
    expect(newState).toEqual(countryList);
  });

  it('should replace the country list when setCountry is dispatched', () => {
    const newCountries = ['Norway', 'Sweden', 'Denmark'];
    const newState = reducer(countryList, setCountry(newCountries));

    expect(newState).toEqual(newCountries);
  });
});
