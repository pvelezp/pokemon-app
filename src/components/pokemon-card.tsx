import React from 'react';
import { Link } from 'react-router-dom';

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, image }) => {
  return (
    <Link to={`/pokemon/${id}`}>
      <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg shadow-md transition-transform transform hover:scale-105 border border-white/20">
        <p>{id}</p>
        <img
          src={image}
          alt={name}
          className="w-24 h-24 mx-auto drop-shadow-lg"
        />
        <p className="text-center text-lg font-semibold mt-2 capitalize">
          {name}
        </p>
      </div>
    </Link>
  );
};

export default PokemonCard;
