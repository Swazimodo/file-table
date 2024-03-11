import { render } from '@testing-library/react';
import App from 'App';

jest.mock('components/mediaQueries', () => ({
  ...jest.requireActual('components/mediaQueries'),
  useMediaQuery: () => ({
    matchesDown: false,
    matchesUp: true
  })
}))

test('renderApp_initialRender_shouldSucceedWithoutRaisingException', () => {
  const { container } = render(<App />);
  const appWrapperElement = container.getElementsByClassName("App")
  expect(appWrapperElement[0]).toBeInTheDocument();
});
