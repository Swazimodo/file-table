import { FC, useContext } from 'react';

import { ToastContextProvider, toastContext } from 'common/toast';
import { ErrorBoundary } from 'common/errorBoundary'
import { FileView } from 'fileView';


function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <ToastContextProvider>
          <RenderWhenReady>
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
