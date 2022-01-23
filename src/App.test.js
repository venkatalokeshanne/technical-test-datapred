import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app', () => {
  render(<App />);
  const linkElement = screen.getByText(/Select the date to display the trends/i);
  expect(linkElement).toBeInTheDocument();
});
