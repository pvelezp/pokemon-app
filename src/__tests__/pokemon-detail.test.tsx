import { fireEvent, render, screen } from '@testing-library/react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePokemonDetails } from 'viewModels/use-pokemon-details';
import PokemonDetails from 'views/pokemon-detail';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/viewModels/use-pokemon-details');
vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
  useNavigate: vi.fn(),
}));

const mockPokemon = {
  id: 25,
  name: 'pikachu',
  image: 'pikachu.png',
  abilities: ['static', 'lightning-rod'],
};

describe('PokemonDetails Component', () => {
  const mockUsePokemonDetails = vi.mocked(usePokemonDetails);
  const mockUseParams = vi.mocked(useParams);
  const mockUseNavigate = vi.mocked(useNavigate);
  const mockNavigate = vi.fn();

  const setupTest = (options: any) => {
    const {
      id = '25',
      data = undefined,
      isLoading = false,
      error = null,
    } = options;

    mockUseParams.mockReturnValue({ id });
    mockUsePokemonDetails.mockReturnValue({
      data,
      isLoading,
      error,
    } as any);

    render(<PokemonDetails />);
  };

  beforeEach(() => {
    vi.resetAllMocks();

    mockUseParams.mockReturnValue({ id: '25' });
    mockUseNavigate.mockReturnValue(mockNavigate);

    mockUsePokemonDetails.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    } as any);
  });

  it('renders loading skeleton when data is loading', () => {
    setupTest({ isLoading: true });

    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders error message when there is an error', () => {
    setupTest({ error: new Error('Failed to fetch') });

    expect(
      screen.getByText('Error al cargar los detalles del Pokémon')
    ).toBeInTheDocument();
  });

  it('renders error message when data is null', () => {
    setupTest({ data: null });

    expect(
      screen.getByText('Error al cargar los detalles del Pokémon')
    ).toBeInTheDocument();
  });

  it('renders pokemon details when data is loaded', () => {
    setupTest({ data: mockPokemon });

    expect(screen.getByText('25. pikachu')).toBeInTheDocument();
    expect(screen.getByText('Abilities')).toBeInTheDocument();
    expect(screen.getByText('static')).toBeInTheDocument();
    expect(screen.getByText('lightning-rod')).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'pikachu.png');
    expect(image).toHaveAttribute('alt', 'pikachu');
  });

  it('navigates to home when back button is clicked', async () => {
    setupTest({ data: mockPokemon });

    fireEvent.click(screen.getByText(/back to home/i));

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('navigates to previous pokemon when previous button is clicked', () => {
    setupTest({ data: mockPokemon });

    fireEvent.click(screen.getByText('Previous'));

    expect(mockNavigate).toHaveBeenCalledWith('/pokemon/24');
  });

  it('navigates to next pokemon when next button is clicked', () => {
    setupTest({ data: mockPokemon });

    fireEvent.click(screen.getByText('Next'));

    expect(mockNavigate).toHaveBeenCalledWith('/pokemon/26');
  });

  it('disables previous button when on first pokemon', () => {
    setupTest({
      id: '1',
      data: { ...mockPokemon, id: 1, name: 'bulbasaur' },
    });

    const previousButton = screen.getByText('Previous');
    expect(previousButton).toBeDisabled();
  });

  it('does not render next button for pokemon 1025', () => {
    setupTest({
      id: '1025',
      data: { ...mockPokemon, id: 1025, name: 'lastpokemon' },
    });

    const nextButton = screen.queryByText('Next');
    expect(nextButton).not.toBeInTheDocument();
  });

  it('calls usePokemonDetails with correct ID parameter', () => {
    setupTest({ id: '42', data: { ...mockPokemon, id: 42, name: 'testmon' } });

    expect(mockUsePokemonDetails).toHaveBeenCalledWith(42);
  });
});
