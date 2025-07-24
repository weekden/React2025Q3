export type Character = {
  appearances?: string[];
  description: string;
  gender?: string;
  id?: string;
  name: string;
  race: string;
};

export type CharacterApiResponse = {
  success: boolean;
  count: number;
  data: Character[];
};
