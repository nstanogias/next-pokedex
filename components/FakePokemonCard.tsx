import Image from 'next/image';
import React, { FC } from 'react';

interface Props {
  name: string;
  imageUrl?: string;
  types?: string;
}

const FakePokemonCard: FC<Props> = ({ name, imageUrl, types }) => {
  const fallbackImageUrl =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Question_Mark.svg/1200px-Question_Mark.svg.png';
  return (
    <div className='flex flex-col'>
      <Image
        src={imageUrl || fallbackImageUrl}
        alt={name}
        width={200}
        height={200}
        className='mx-auto w-full bg-[#F2F2F2] rounded-lg'
      />
      <span className='font-bold text-md text-slate-500'># fake</span>
      <p className='text-2xl font-semibold first-letter:uppercase'>{name}</p>
      {types && (
        <div className='flex flex-row gap-x-4'>
          {types.split(',').map((type, index) => (
            <p key={index} className='first-letter:uppercase'>
              {type}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default FakePokemonCard;
