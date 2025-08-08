import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CharacterApiResponse, CharacterIdResponse } from '../types/api';

export const zeldaApi = createApi({
  reducerPath: 'zeldaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://zelda.fanapis.com/api/' }),
  endpoints: (build) => ({
    getCharacters: build.query<
      CharacterApiResponse,
      { query: string; limit: number; page: number }
    >({
      query: ({ query, limit, page }) => {
        const activePage = page - 1;
        return `characters?name=${encodeURIComponent(query)}&limit=${limit}&page=${activePage}`;
      },
    }),

    getCharacterById: build.query<CharacterIdResponse, string>({
      query: (id) => `characters/${id}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = zeldaApi;
