import { createContext, useState, type ReactNode } from 'react';

export type FiltersContextType = {
  country: string;
  year: number;
  setCountry: (country: string) => void;
  setYear: (year: number) => void;
};

const FilterContext = createContext<FiltersContextType | null>(null);

function FilterProvider({ children }: { children: ReactNode }): ReactNode {
  const [country, setCountry] = useState('');
  const [year, setYear] = useState(2023);

  return (
    <FilterContext.Provider value={{ country, year, setCountry, setYear }}>
      {children}
    </FilterContext.Provider>
  );
}

export { FilterProvider, FilterContext };
