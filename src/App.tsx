import { ErrorBoundary } from 'components/errorBoundary'
import { AppContextProviders } from 'appContextProviders';
import { ToastMessageEmitter } from 'components/toast';
import { FileView } from 'fileView';


function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <AppContextProviders>
          <ToastMessageEmitter />
          <FileView />
        </AppContextProviders>
      </ErrorBoundary>
    </div>
  );
}

export default App;
