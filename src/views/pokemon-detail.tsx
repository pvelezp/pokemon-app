import ErrorMessage from '@/components/error-page';
import Layout from '@/components/home-layout';
import { usePokemonStore } from '@/store/pokemon-store';
import { POKEMONS_PER_PAGE } from 'constants/pokemon';
import { useNavigate, useParams } from 'react-router-dom';
import { usePokemonDetails } from 'viewModels/use-pokemon-details';

const PokemonDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { setLastViewedPage } = usePokemonStore();
  const navigate = useNavigate();
  const pokemonId = Number(id);
  const { data: pokemon, isLoading, error } = usePokemonDetails(Number(id));

  const handleNavigate = (id: number) => {
    navigate(`/pokemon/${id}`);
  };

  if (isLoading)
    return (
      <Layout>
        <div className="flex flex-col items-center gap-6">
          <div className="w-56 h-64 bg-gray-300 dark:bg-gray-700/20 rounded-md animate-pulse" />
          <div className="w-40 h-6 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse mb-4"></div>
          <div className="flex flex-col gap-2">
            <div className="w-32 h-6 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
            <div className="w-32 h-6 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
          </div>
        </div>
      </Layout>
    );

  if (error || !pokemon)
    return <ErrorMessage title="Error al cargar los detalles del Pokémon" />;

  return (
    <Layout>
      <button
        onClick={() => {
          setLastViewedPage(Math.ceil(pokemonId / POKEMONS_PER_PAGE));
          navigate('/');
        }}
        className="px-6 py-2 bg-cyan-700 rounded-full shadow-lg hover:bg-cyan-800"
      >
        ◀️ Back to Home
      </button>

      <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto mt-12">
        <h1 className="text-4xl font-extrabold text-center capitalize mb-4 tracking-wide">
          {pokemon.id}. {pokemon.name}
        </h1>
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-56 h-56 rounded-md shadow-xl mb-6"
        />

        <h2 className="text-2xl font-semibold text-center mb-4">Abilities</h2>
        <ul className="gap-2 text-lg text-gray-700 dark:text-gray-300 pl-0">
          {pokemon.abilities.map((ability, index) => (
            <li
              key={`${ability}-${index}`}
              className="text-gray-800 dark:text-gray-200"
            >
              {ability}
            </li>
          ))}
        </ul>

        {/* Navigation Buttons */}
        <div className="flex justify-between w-full space-x-4 mt-6">
          <button
            onClick={() => handleNavigate(pokemonId - 1)}
            disabled={pokemonId === 1}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-purple-300 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            Previous
          </button>

          {pokemonId < 1025 && (
            <button
              onClick={() => handleNavigate(pokemonId + 1)}
              className="px-6 py-3 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-lg shadow-lg hover:from-teal-600 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-teal-300 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 w-full sm:w-auto"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PokemonDetails;
