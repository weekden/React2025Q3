import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ZeldaTagTypes,
  type CharacterApiResponse,
  type CharacterIdResponse,
} from '../types/api';

export const zeldaApi = createApi({
  reducerPath: 'zeldaApi',
  tagTypes: [ZeldaTagTypes.CharacterList, ZeldaTagTypes.Character],
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
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                id,
                type: ZeldaTagTypes.CharacterList,
              })),
            ]
          : [ZeldaTagTypes.CharacterList],
    }),

    getCharacterById: build.query<CharacterIdResponse, string>({
      query: (id: string) => `characters/${id}`,
      providesTags: (_result, _error, id) => {
        return [{ type: ZeldaTagTypes.Character, id }];
      },
    }),
    clearCharactersCache: build.mutation({
      queryFn: () => ({ data: null }),
      invalidatesTags: [ZeldaTagTypes.CharacterList],
    }),

    clearCharacterCacheById: build.mutation({
      queryFn: () => ({ data: undefined }),
      invalidatesTags: (id) => [{ type: ZeldaTagTypes.Character, id }],
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useGetCharacterByIdQuery,
  useClearCharactersCacheMutation,
  useClearCharacterCacheByIdMutation,
} = zeldaApi;
