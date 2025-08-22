export const countriesFilter = (
  countries: string[],
  query: string
): string[] => {
  const filterArr = countries.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );
  return filterArr.sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );
};
