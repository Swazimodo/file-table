import React from 'react';
import { render, screen } from '@testing-library/react';
import * as toast from "components/toast";
import { AppContextProviders } from 'appContextProviders';


afterEach(() => {
  jest.restoreAllMocks()
});

interface WithChildrenProps {
  children?: React.ReactNode
}

const mockToastContextProvider = (contextValue: any) => (props: WithChildrenProps) => {
  return <toast.toastContext.Provider value={contextValue}>
    {props.children}
  </toast.toastContext.Provider>
}

test('renderAppContextProviders_contextIsNull_shouldNotRenderChildren', async () => {
  jest.spyOn(toast, "ToastContextProvider").mockImplementation(mockToastContextProvider(null))
  const content = 'testContentToRender'

  render(<AppContextProviders>{content}</AppContextProviders>);

  const childElement = await screen.findByText(content).catch(() => null)
  expect(childElement).not.toBeInTheDocument();
});

test('renderAppContextProviders_contextIsNotNull_shouldRenderChildren', async () => {
  jest.spyOn(toast, "ToastContextProvider").mockImplementation(mockToastContextProvider({}))
  const content = 'testContentToRender'

  render(<AppContextProviders>{content}</AppContextProviders>);

  const childElement = await screen.findByText(content)
  expect(childElement).toBeInTheDocument();
});
