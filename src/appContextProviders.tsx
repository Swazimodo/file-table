import { FC, useContext } from 'react';

import { ToastContextProvider, toastContext } from 'components/toast';


interface WithChildrenProps {
  children?: React.ReactNode
}

export const AppContextProviders: FC<WithChildrenProps> = (props) => {
  return <ToastContextProvider>
    <RenderWhenReady>
      {props.children}
    </RenderWhenReady>
  </ToastContextProvider>
}

// This will not render the children until all context values are truthy
// this will prevent the whole app from needing to do null checks
const RenderWhenReady: FC<WithChildrenProps> = (props) => {
  const { children } = props
  const toastCtx = useContext(toastContext)
  if (!toastCtx) {
    return null
  }
  return <>{children}</>
}
