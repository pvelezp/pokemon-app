import axios from 'config/axios';
import { IMAGE_URL } from '../../config/api-urls';
import { Pokemon } from '../domain/types';

export const getPokemonList = async (
  page: number,
  limit = 10
): Promise<Pokemon[]> => {
  const offset = (page - 1) * limit;
  const response = await axios.get(`?offset=${offset}&limit=${limit}`);

  return response.data.results.map((pokemon: any, index: number) => ({
    id: offset + index + 1,
    name: pokemon.name,
    image: `${IMAGE_URL}${offset + index + 1}.png`,
    abilities: [],
  }));
};

export const getPokemonDetails = async (id: number): Promise<Pokemon> => {
  const response = await axios.get(`/${id}`);
  return {
    id,
    name: response.data.name,
    image: response.data.sprites.other.home.front_default,
    abilities: response.data.abilities.map((a: any) => a.ability.name),
  };
};
