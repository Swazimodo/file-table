import React from 'react';
import { render, screen } from '@testing-library/react';
import App from 'App';

test('renders learn react link', () => {
  const { container } = render(<App />);
  const appWrapperElement = container.getElementsByClassName("App")
  expect(appWrapperElement[0]).toBeInTheDocument();
});
