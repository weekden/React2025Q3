export type SearchState = {
  query: string;
};

export type SearchProps = {
  onQueryChange: (query: string) => void;
};
