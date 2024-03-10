import { FC, useContext } from 'react';

import { ToastContextProvider, ToastMessageEmitter, toastContext } from 'components/toast';
import { ErrorBoundary } from 'components/errorBoundary'
import { FileView } from 'fileView';


function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <ToastContextProvider>
          <RenderWhenReady>
            <ToastMessageEmitter />
            <FileView />
          </RenderWhenReady>
        </ToastContextProvider>
      </ErrorBoundary>
    </div>
  );
}

interface WithChildrenProps {
  children?: React.ReactNode
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

export default App;
