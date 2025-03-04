import PokemonCard from '@/components/pokemon-card';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

describe('PokemonCard', () => {
  const mockPokemon = {
    id: 25,
    name: 'Pikachu',
    image: 'pikachu.png',
  };

  beforeEach(() => {
    render(
      <Router>
        <PokemonCard {...mockPokemon} />
      </Router>
    );
  });

  it('should render pokemon card with correct details', () => {
    expect(screen.getByText(mockPokemon.id)).toBeInTheDocument();
    expect(screen.getByText(mockPokemon.name)).toBeInTheDocument();
    expect(screen.getByAltText(mockPokemon.name)).toHaveAttribute(
      'src',
      mockPokemon.image
    );
  });

  it('should navigate to the correct link on click', () => {
    fireEvent.click(screen.getByText(mockPokemon.name));

    expect(window.location.pathname).toBe(`/pokemon/${mockPokemon.id}`);
  });
});
