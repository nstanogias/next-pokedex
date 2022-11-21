import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { GrFormPreviousLink } from 'react-icons/gr';
import Bar from '../../components/Bar';
import EvolutionDetails from '../../components/EvolutionDetails';
import { NameUrl, PageData, Pokemon } from '../../types';
import { fetcher } from '../_app';

interface Props {
  pokemonDetails: Pokemon;
  evolutionDetails: any;
  error?: string;
}

const Pokemon: NextPage<Props> = ({ pokemonDetails, evolutionDetails, error }) => {
  if (error || !pokemonDetails) {
    return <p className='text-xl'>Error: {error}</p>;
  }
  const pokeIndex = ('000' + pokemonDetails.id).slice(-3);
  return (
    <>
      <Head>
        <title>{pokemonDetails.name}</title>
      </Head>

      <div className='flex flex-col mx-auto'>
        <div className='flex justify-between'>
          <Link href={'/'}>
            <GrFormPreviousLink className='text-4xl' />
          </Link>
          <div className='flex text-4xl'>
            <span className='text-gray-400'># {pokeIndex} </span>
            <p className='ml-2 font-semibold text-[#1B82B1] first-letter:uppercase'>{pokemonDetails.name}</p>
          </div>
          <div></div>
        </div>

        <div className='flex mt-10 gap-x-10'>
          <Image
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeIndex}.png`}
            alt={pokemonDetails.name}
            width={400}
            height={400}
            className='bg-[#F2F2F2] rounded-xl'
          />
          <div className='bg-[#30A7D6] p-8 rounded-xl h-fit w-[400px]'>
            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <label className='text-xl text-white'>Height</label>
                <p className='mt-1 font-semibold'>{pokemonDetails.height / 10} m</p>
              </div>
              <div className='flex flex-col'>
                <label className='text-xl text-white'>Weight</label>
                <p className='mt-1 font-semibold'>{pokemonDetails.weight / 10} kg</p>
              </div>
            </div>
            <div className='flex justify-between mt-4'>
              <div className='flex flex-col'>
                <label className='text-xl text-white'>Moves</label>
                {pokemonDetails.moves.slice(0, 5).map((move) => {
                  return (
                    <span key={move.move.name} className='font-semibold'>
                      {move.move.name}
                    </span>
                  );
                })}
              </div>
              <div className='flex flex-col'>
                <label className='text-xl text-white'>Abilities</label>
                {pokemonDetails.abilities
                  .filter((ab) => !ab.is_hidden)
                  .slice(0, 5)
                  .map((ability) => {
                    return (
                      <span key={ability.ability.name} className='font-semibold'>
                        {ability.ability.name}
                      </span>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className='flex mt-12 gap-x-10'>
          <div className='flex flex-col'>
            <h5 className='my-3 text-2xl font-bold'>Stats</h5>
            <div>
              {pokemonDetails.stats.map((stat, i) => (
                <Bar value={stat} key={i} />
              ))}
            </div>
          </div>
          <div className='flex flex-col'>
            <h5 className='my-3 text-2xl font-bold'>Evolutions</h5>
            <EvolutionDetails evolutionDetails={evolutionDetails} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Pokemon;

export const getStaticPaths: GetStaticPaths = async () => {
  const pokemons: PageData = await fetcher(`https:pokeapi.co/api/v2/pokemon/?limit=16&offset=0`);

  // Get the paths we want to pre-render
  // We will pre-render only the first page at build time
  const paths = pokemons?.results.map((pok: NameUrl) => `/pokemon/${pok.name}`);

  // { fallback: blocking } means other paths will be server generated on the first request and then cached for subsequent requests
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { name } = params!;
    const pokemonDetails = await fetcher(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemonSpeciesDetails = await fetcher(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
    const evolutionDetails = await fetcher(pokemonSpeciesDetails?.evolution_chain.url);

    if (!(pokemonDetails && evolutionDetails)) {
      return { props: { error: 'Something went wrong while fetching pokemon data' } };
    }
    return {
      props: { pokemonDetails, evolutionDetails },
    };
  } catch (err: any) {
    return { props: { error: err.message } };
  }
};
