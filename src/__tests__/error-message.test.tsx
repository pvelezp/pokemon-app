import ErrorMessage from '@/components/error-page';
import { render, screen } from '@testing-library/react';

describe('ErrorMessage', () => {
  const mockTitle = 'Error de conexión';
  const mockDescription = 'No se pudo conectar al servidor. Intenta más tarde.';

  beforeEach(() => {
    render(<ErrorMessage title={mockTitle} description={mockDescription} />);
  });

  it('should render the error title and description correctly', () => {
    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    expect(screen.getByText(mockDescription)).toBeInTheDocument();
  });

  it('should render default description if not provided', () => {
    render(<ErrorMessage title={mockTitle} />);

    expect(
      screen.getByText(
        'Lo sentimos, no pudimos cargar los datos. Por favor, intenta nuevamente.'
      )
    ).toBeInTheDocument();
  });
});
