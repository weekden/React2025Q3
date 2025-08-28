export type YearlyData = {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
};

export type CountryInfo = {
  iso_code: string;
  data: YearlyData[];
};

export type CountryData = {
  [country: string]: CountryInfo;
};
