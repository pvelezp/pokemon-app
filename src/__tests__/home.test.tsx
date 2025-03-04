import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { usePokemonList } from 'viewModels/use-pokemon-list';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Home from '../views/home';

vi.mock('@/viewModels/use-pokemon-list');

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

const mockPokemonList: Pokemon[] = [
  { id: 1, name: 'bulbasaur', image: 'bulbasaur.png' },
  { id: 2, name: 'ivysaur', image: 'ivysaur.png' },
  { id: 3, name: 'venusaur', image: 'venusaur.png' },
];

describe('Home Component', () => {
  const mockUsePokemonList = vi.mocked(usePokemonList);

  const renderHomeComponent = () => {
    return render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    vi.resetAllMocks();

    mockUsePokemonList.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
      error: null,
      status: 'idle',
      isPending: false,
      isSuccess: false,
    } as any);
  });

  it('renders loading skeletons when data is loading', () => {
    mockUsePokemonList.mockReturnValue({
      data: undefined,
      isLoading: true,
      isPending: true,
      status: 'loading',
      isError: false,
      error: null,
      isSuccess: false,
    } as any);

    renderHomeComponent();

    expect(screen.getByText('🔥 Pokémon App')).toBeInTheDocument();

    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBe(10);
  });

  it('renders error message when there is an error', () => {
    mockUsePokemonList.mockReturnValue({
      data: undefined,
      isLoading: false,
      isPending: false,
      isError: true,
      error: new Error('Failed to fetch'),
      status: 'error',
      isSuccess: false,
    } as any);

    renderHomeComponent();

    expect(
      screen.getByText('Error al cargar los Pokémons')
    ).toBeInTheDocument();
  });

  it('renders pokemon list when data is loaded', () => {
    mockUsePokemonList.mockReturnValue({
      data: mockPokemonList,
      isLoading: false,
      isPending: false,
      isError: false,
      error: null,
      isSuccess: true,
      status: 'success',
    } as any);

    renderHomeComponent();

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
    expect(screen.getByText('venusaur')).toBeInTheDocument();

    const images = screen.getAllByRole('img');
    expect(images.length).toBe(3);
    expect(images[0]).toHaveAttribute('src', 'bulbasaur.png');
    expect(images[0]).toHaveAttribute('alt', 'bulbasaur');
  });

  it('links to correct pokemon detail pages', () => {
    mockUsePokemonList.mockReturnValue({
      data: mockPokemonList,
      isLoading: false,
      isPending: false,
      isError: false,
      error: null,
      isSuccess: true,
      status: 'success',
    } as any);

    renderHomeComponent();

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/pokemon/1');
    expect(links[1]).toHaveAttribute('href', '/pokemon/2');
    expect(links[2]).toHaveAttribute('href', '/pokemon/3');
  });
});
