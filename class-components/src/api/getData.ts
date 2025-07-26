import type { CharacterApiResponse, CharacterIdResponse } from '../types/api';
const BASE_URL = 'https://zelda.fanapis.com/api/characters';
export const fetchCharacters = async (
  query: string,
  limit: number,
  page: number
): Promise<CharacterApiResponse> => {
  const activePage = page - 1;
  const response = await fetch(
    `${BASE_URL}?name=${encodeURIComponent(query)}&limit=${limit}&page=${activePage}`
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

export const fetchCharactersById = async (
  id: string
): Promise<CharacterIdResponse> => {
  const response = await fetch(`${BASE_URL}/${id}`);
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
