import type { CharacterApiResponse } from '../types/api';

export const fetchCharacters = async (
  query: string
): Promise<CharacterApiResponse> => {
  const response = await fetch(
    `https://zelda.fanapis.com/api/characters?name=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    if (response.status >= 400 && response.status < 500) {
      throw new Error(
        `Client error ${response.status} - ${response.statusText}`
      );
    } else if (response.status >= 500) {
      throw new Error(
        `Server error ${response.status} - ${response.statusText}`
      );
    }
  }

  return await response.json();
};
