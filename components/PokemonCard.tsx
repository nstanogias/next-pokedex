import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import useSWR from 'swr';
import { Pokemon } from '../types';

interface Props {
  url: string;
  index: number;
}

const PokemonCard: FC<Props> = ({ url, index }) => {
  const { data: pokemonData, error } = useSWR<Pokemon>(url, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const pokeIndex = ('000' + index).slice(-3);

  if (error) return <h3>something went wrong while fetching pokemon data</h3>;

  return (
    <>
      {pokemonData && (
        <div className='flex flex-col'>
          <Link href={`/pokemon/${pokemonData.name}`} className='bg-[#F2F2F2] rounded-lg'>
            <Image
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeIndex}.png`}
              alt={pokemonData.name}
              width={200}
              height={200}
              className='mx-auto'
            />
          </Link>
          <span className='font-bold text-md text-slate-500'>#{pokeIndex}</span>
          <p className='text-2xl font-semibold first-letter:uppercase'>{pokemonData.name}</p>
          {pokemonData.types.length > 0 && (
            <div className='flex flex-row gap-x-4'>
              {pokemonData.types.map((type) => (
                <p key={type.type.name} className='first-letter:uppercase'>
                  {type.type.name}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PokemonCard;
