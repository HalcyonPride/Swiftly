import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Swiftly/);
  expect(headingElement).toBeInTheDocument();
});
