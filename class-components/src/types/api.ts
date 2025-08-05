export type Character = {
  appearances?: string[];
  description?: string;
  gender?: string;
  id: string;
  name: string;
  race: string | null;
  onClick?: () => void;
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
