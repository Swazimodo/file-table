// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// this allows turning off expected console chatter in tests without having to enable it again
// ex: jest.spyOn(console, 'error').mockImplementation(jest.fn());
afterEach(() => {
  if ((console.info as any).mockRestore) {
    (console.info as any).mockRestore();
  }
  if ((console.warn as any).mockRestore) {
    (console.warn as any).mockRestore();
  }
  if ((console.error as any).mockRestore) {
    (console.error as any).mockRestore();
  }
});
