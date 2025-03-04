import { useQuery } from '@tanstack/react-query';
import { MAX_POKEMON_COUNT, POKEMONS_PER_PAGE } from 'constants/pokemon';
import { getPokemonList } from 'models/data/pokemon-api';
import { useMemo } from 'react';

export const usePokemonList = (page: number) => {
  const {
    data: pokemonList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['pokemonList', page],
    queryFn: () => getPokemonList(page),
  });

  const totalPages = Math.ceil(MAX_POKEMON_COUNT / POKEMONS_PER_PAGE);
  const isLastPage = page >= totalPages;

  const filteredPokemonList = useMemo(
    () => pokemonList?.filter((pokemon) => pokemon.id <= MAX_POKEMON_COUNT),
    [pokemonList]
  );

  return {
    data: filteredPokemonList,
    isLoading,
    error,
    isLastPage,
  };
};
