import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
  species: any;
}

const EvolutionImage: FC<Props> = ({ species }) => {
  const pokeIndex = ('000' + +species.url.split('/').slice(-2, -1)[0]).slice(-3);

  return (
    <div className='flex flex-col items-center justify-center'>
      <Link href={`/pokemon/${species.name}`} className='w-24 h-24 bg-gray-300 rounded-full'>
        <Image
          key={species.name}
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeIndex}.png`}
          height={100}
          width={100}
          alt={species.name}
        />
      </Link>
      <p className='mt-2 font-semibold text-md first-letter:uppercase'>{species.name}</p>
    </div>
  );
};

export default EvolutionImage;
