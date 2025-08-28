import { useContext } from 'react';
import {
  FilterContext,
  type FiltersContextType,
} from '../context/filterContext';

export function useFilters(): FiltersContextType | null {
  const filtersContext = useContext(FilterContext);
  if (!filtersContext) {
    throw new Error('useFilters must be used within FilterProvider');
  }
  return filtersContext;
}
