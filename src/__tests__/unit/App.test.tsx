import { render } from '@testing-library/react';
import App from 'App';

test('renderApp_initialRender_shouldSucceedWithoutRaisingException', () => {
  const { container } = render(<App />);
  const appWrapperElement = container.getElementsByClassName("App")
  expect(appWrapperElement[0]).toBeInTheDocument();
});
