import { render, screen } from '@testing-library/react';
import App from './App';

test('renders mood prompt', () => {
  render(<App />);
  //const linkElement = screen.getByText(/what's your mood/i);
    const textElement = screen.getByText(/what's your mood/i);
    expect(textElement).toBeInTheDocument();
 // expect(linkElement).toBeInTheDocument();
});
