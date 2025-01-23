import { render, screen } from '@testing-library/react';
import Home from '../Home';

test('displays correct prices for products', () => {
  render(<Home />);

  expect(screen.getByText(/RS 300/)).toBeInTheDocument();
  expect(screen.getByText(/RS 200/)).toBeInTheDocument();
  expect(screen.getByText(/RS 250/)).toBeInTheDocument();
});
