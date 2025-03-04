import { render, screen } from '@testing-library/react';
import Header from '@/components/header';

describe('Header Component', () => {
  it('should render the correct heading text', () => {
    render(<Header />);

    const headerElement = screen.getByText(/pokémon app/i);
    expect(headerElement).toBeInTheDocument();
  });
});
