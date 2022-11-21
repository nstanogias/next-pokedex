import React, { FC } from 'react';
import EvolutionImage from './EvolutionImage';
import { GrNext } from 'react-icons/gr';

interface Props {
  evolutionDetails: any;
}

const EvolutionDetails: FC<Props> = ({ evolutionDetails }) => {
  return (
    <div className='flex items-center mt-4'>
      {evolutionDetails.chain.species && <EvolutionImage species={evolutionDetails.chain.species} />}

      {evolutionDetails.chain.evolves_to.length !== 0 && (
        <>
          <GrNext className='mx-4 text-2xl' />
          {evolutionDetails.chain.evolves_to.map((evol: any, idx: number) => {
            return <EvolutionImage key={idx} species={evol.species} />;
          })}
        </>
      )}

      {typeof evolutionDetails.chain.evolves_to[0]?.evolves_to !== 'undefined' &&
        evolutionDetails.chain.evolves_to[0].evolves_to.length !== 0 && (
          <>
            <GrNext className='mx-4 text-2xl' />
            {evolutionDetails.chain.evolves_to[0].evolves_to.map((evol: any, idx: number) => {
              return <EvolutionImage key={idx} species={evol.species} />;
            })}
          </>
        )}
    </div>
  );
};

export default EvolutionDetails;
