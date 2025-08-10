import { Toast } from './components';
import { ServicesProvider } from './contexts/ServicesContext';
import AppContainer from './routes';

function App() {
  return (
    <ServicesProvider>
      <AppContainer />
      <Toast />
    </ServicesProvider>
  );
}

export default App
