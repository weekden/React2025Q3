export type Character = {
  appearances?: string[];
  description?: string;
  gender?: string;
  id: string;
  name: string;
  race: string | null;
};

export type CharacterApiResponse = {
  success: boolean;
  count: number;
  data: Character[];
};

export type CharacterIdResponse = {
  success: boolean;
  data: Character;
};
export const ZeldaTagTypes = {
  CharacterList: 'CharacterList',
  Character: 'Character',
};
