export interface Pokemon {
  id: number;
  name: string;
  image: string;
  abilities: string[];
}

export type PokemonRepository = {
  getPokemonList: (page: number) => Promise<Pokemon[]>;
  getPokemonDetails: (id: number) => Promise<Pokemon>;
};

export type PokemonState = {
  lastViewedPage: number;
  lastViewedPokemonId: number | null;
  setLastViewedPage: (page: number) => void;
  setLastViewedPokemonId: (id: number) => void;
};
