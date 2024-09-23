import { FAVORITES_PATH, USER_PATH, mainLayoutRoutes } from './consts';
import { Route, Routes as RoutesWrapper } from 'react-router-dom';

import PrivateRoute from '../components/privateRoute/PrivateRoute';

const Routes = () => {
  const { Layout, routes } = mainLayoutRoutes;

  return (
    <RoutesWrapper>
      {routes.map(({ path, Component }) => {
        const isPrivateRoute = path === USER_PATH || path === FAVORITES_PATH;

        return (
          <Route
            key={path}
            path={path}
            element={
              isPrivateRoute ? (
                <PrivateRoute>
                  <Layout>
                    <Component />
                  </Layout>
                </PrivateRoute>
              ) : (
                <Layout>
                  <Component />
                </Layout>
              )
            }
          />
        );
      })}
    </RoutesWrapper>
  );
};

export default Routes;
