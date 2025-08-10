import { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { FullScreenLoading } from '../components';
import { Layout } from '../components/layout/Layout';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';

const AppRoute = lazy(() => import('./AppRoutes'));
const AppContainer = () => {
  return (
    <Router>
      <Routes>
        <Route path={ '/login' } element = {< LoginPage />}/>
        <Route path={ '/signup' } element = {< SignupPage />}/>
        <Route
          caseSensitive
          path={'*'}
          element={
            <Layout>
              <Suspense
                fallback={
                    <FullScreenLoading />
                }
              >
                <AppRoute/>
              </Suspense>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppContainer;
