import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

test('renders the headline', () => {
  render(<App />);
  const heading = screen.getByText(/Reasons I love you, Sharu!/i);
  expect(heading).toBeInTheDocument();
});
