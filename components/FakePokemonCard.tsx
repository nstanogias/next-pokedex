import React, { FC } from 'react';

interface Props {
  name: string;
  imageUrl?: string;
  types?: string;
}

const FakePokemonCard: FC<Props> = ({ name, imageUrl, types }) => {
  return <div>FakePokemonCard</div>;
};

export default FakePokemonCard;
