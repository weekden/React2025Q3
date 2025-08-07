import reducer, { clearSelection, toggleCard } from '../../store/cardsSlice';
import type { Character } from '../../types/api';
import { describe, expect, it } from 'vitest';

describe('checkCardsSlice reducer', () => {
  const mockCharacter: Character = {
    name: 'Link',
    race: 'Hylian',
    description: 'Hero of Hyrule',
    id: 'card-1',
  };

  it('should add a character when the list is empty', () => {
    const newState = reducer({ list: [] }, toggleCard(mockCharacter));
    expect(newState.list).toEqual([mockCharacter]);
  });

  it('should remove a character when already in the list', () => {
    const prevState = { list: [mockCharacter] };
    const newState = reducer(prevState, toggleCard(mockCharacter));
    expect(newState.list).toEqual([]);
  });

  it('should clear the selection', () => {
    const prevState = {
      list: [
        mockCharacter,
        {
          name: 'Zelda',
          race: 'Hylian',
          description: 'Princess of Hyrule',
          id: 'card-2',
        },
      ],
    };
    const newState = reducer(prevState, clearSelection());
    expect(newState.list).toEqual([]);
  });
});
