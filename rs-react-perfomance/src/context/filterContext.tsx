import { createContext, useState, type ReactNode } from 'react';

export type FiltersContextType = {
  country: string;
  year: number;
  region: string;
  setCountry: (country: string) => void;
  setYear: (year: number) => void;
  setRegion: (region: string) => void;
};

const FilterContext = createContext<FiltersContextType | null>(null);

function FilterProvider({ children }: { children: ReactNode }): ReactNode {
  const [country, setCountry] = useState('');
  const [year, setYear] = useState(2023);
  const [region, setRegion] = useState('');

  return (
    <FilterContext.Provider
      value={{ country, year, region, setCountry, setYear, setRegion }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export { FilterProvider, FilterContext };
