import React, { useState } from 'react';
import usePagination from '../hooks/usePagination';

const CreatePokemon = () => {
  const [name, setName] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [types, setTypes] = useState<string>('');

  const { mutate: paginatedPokemonsMutate } = usePagination();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 10000);

    const FAKE_POKEMON = {
      results: [
        {
          isFake: true,
          name,
          imageUrl,
          types,
        },
      ],
    };
    paginatedPokemonsMutate((data: any) => {
      return [FAKE_POKEMON, ...data];
    }, false);

    setName('');
    setImageUrl('');
    setTypes('');

    // Normally, an API call would follow here like below

    // await axios("/pokemons", {
    //   method: "POST",
    //   data: {.....}
    // });

    // And at this point, we would revalidate the cache!

    // paginatedPokemonsMutate();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col p-4 mx-auto mt-6 border border-blue-400 rounded-[8px] w-[300px] md:w-[400px]'
    >
      <label className='font-semibold'>Name:</label>
      <input
        placeholder='Pokemon name'
        className='p-2 border'
        onChange={(e) => setName(e.target.value)}
        value={name}
      ></input>
      <label className='mt-2 font-semibold'>Image Url:</label>
      <input
        className='p-2 border'
        placeholder='Image Url'
        onChange={(e) => setImageUrl(e.target.value)}
        value={imageUrl}
      ></input>
      <label className='mt-2 font-semibold'>Types:</label>
      <input
        placeholder='Comma separated'
        className='p-2 border'
        onChange={(e) => setTypes(e.target.value)}
        value={types}
      ></input>
      <button
        disabled={name === ''}
        className='flex mt-4 p-2 rounded-[8px] bg-[#1B82B1] text-xl text-white w-fit disabled:bg-gray-300'
        type='submit'
      >
        Add Pokemon
      </button>
    </form>
  );
};

export default CreatePokemon;
