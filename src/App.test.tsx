import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the headline', () => {
  render(<App />);
  const heading = screen.getByText(/Every Day, A New Reason/i);
  expect(heading).toBeInTheDocument();
});
