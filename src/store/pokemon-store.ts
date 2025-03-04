import { PokemonState } from 'models/domain/types';
import { create } from 'zustand';

export const usePokemonStore = create<PokemonState>((set) => ({
  lastViewedPage: 1,
  lastViewedPokemonId: null,
  setLastViewedPage: (page) => set({ lastViewedPage: page }),
  setLastViewedPokemonId: (id) => set({ lastViewedPokemonId: id }),
}));
