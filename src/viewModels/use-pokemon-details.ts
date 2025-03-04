import { useQuery } from '@tanstack/react-query';
import { getPokemonDetails } from '../models/data/pokemon-api';

export const usePokemonDetails = (id: number) => {
  return useQuery({
    queryKey: ['pokemonDetails', id],
    queryFn: () => getPokemonDetails(id),
  });
};
