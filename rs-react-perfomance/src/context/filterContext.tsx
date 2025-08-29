import { createContext, useState, type ReactNode } from 'react';
import type { SortOrder } from '../types/table';

export type FiltersContextType = {
  country: string;
  year: number;
  countryOrder: SortOrder;
  populationOrder: SortOrder;
  setCountry: (country: string) => void;
  setYear: (year: number) => void;
  setCountryOrder: (order: SortOrder) => void;
  setPopulationOrder: (order: SortOrder) => void;
};

const FilterContext = createContext<FiltersContextType | null>(null);

function FilterProvider({ children }: { children: ReactNode }): ReactNode {
  const [country, setCountry] = useState('');
  const [year, setYear] = useState(2023);
  const [countryOrder, setCountryOrder] = useState<SortOrder>('');
  const [populationOrder, setPopulationOrder] = useState<SortOrder>('');

  return (
    <FilterContext.Provider
      value={{
        country,
        year,
        countryOrder,
        populationOrder,
        setCountry,
        setYear,
        setCountryOrder,
        setPopulationOrder,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export { FilterProvider, FilterContext };
