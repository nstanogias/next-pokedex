import type { NextPage } from 'next';
import Head from 'next/head';
import CreatePokemon from '../components/CreatePokemon';
import FakePokemonCard from '../components/FakePokemonCard';
import Loader from '../components/Loader';
import PokemonCard from '../components/PokemonCard';
import usePagination from '../hooks/usePagination';

const Home: NextPage = () => {
  const { data: flattenedPokemonPages, size, setSize, isLoadingMore, isReachedEnd } = usePagination();

  return (
    <>
      <Head>
        <title>Pokedex</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex flex-col items-center flex-1 '>
        <h2 className='text-4xl font-semibold text-[#1B82B1]'>Pokemons</h2>
        <CreatePokemon />
        <div className='grid w-full grid-cols-1 mt-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8'>
          {flattenedPokemonPages?.map((page, i) =>
            page.isFake ? (
              <FakePokemonCard key={i} name={page.name} imageUrl={page.imageUrl} types={page.types} />
            ) : (
              <PokemonCard key={i} url={page.url} />
            )
          )}
        </div>

        {!!flattenedPokemonPages.length && !isReachedEnd && (
          <button
            onClick={() => setSize(size + 1)}
            className='mx-auto mt-10 rounded-[8px] bg-[#1B82B1] px-4 py-[12px] text-xl text-white md:px-[30px]'
          >
            Load more Pokemon
          </button>
        )}
        {!flattenedPokemonPages.length && <Loader />}

        {isLoadingMore && <Loader />}
      </main>
    </>
  );
};

export default Home;
