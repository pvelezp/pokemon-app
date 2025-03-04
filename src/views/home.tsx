import ErrorMessage from '@/components/error-page';
import Layout from '@/components/home-layout';
import PokemonCard from '@/components/pokemon-card';
import SkeletonCard from '@/components/skeleton-card';
import { usePokemonStore } from '@/store/pokemon-store';
import { POKEMONS_PER_PAGE } from 'constants/pokemon';
import { useEffect, useState } from 'react';
import { usePokemonList } from 'viewModels/use-pokemon-list';

const Home = () => {
  const { lastViewedPage, setLastViewedPage } = usePokemonStore();
  const [page, setPage] = useState(lastViewedPage || 1);
  const {
    data: pokemonList,
    isLoading,
    error,
    isLastPage,
  } = usePokemonList(page);

  useEffect(() => {
    setLastViewedPage(page);
  }, [page]);

  if (isLoading)
    return (
      <Layout>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(POKEMONS_PER_PAGE)
            .fill(0)
            .map((_, index) => (
              <SkeletonCard key={index} />
            ))}
        </div>
      </Layout>
    );

  if (error) {
    return <ErrorMessage title="Error al cargar los Pokémons" />;
  }

  return (
    <Layout>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemonList?.map((pokemon) => (
          <PokemonCard key={pokemon.id} {...pokemon} />
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-6">
        <button
          onClick={() => setPage((page) => Math.max(1, page - 1))}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-full text-white font-medium shadow-md transition-all"
        >
          ◀️ Anterior
        </button>

        {!isLastPage && (
          <button
            onClick={() => setPage((page) => page + 1)}
            className="px-6 py-2 bg-green-600 hover:bg-green-500 rounded-full text-white font-medium shadow-md transition-all"
          >
            Siguiente ▶️
          </button>
        )}
      </div>
    </Layout>
  );
};

export default Home;
