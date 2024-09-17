import { Route, Routes as RoutesWrapper } from 'react-router-dom';
import { USER_PATH, mainLayoutRoutes } from './consts';

import PrivateRoute from '../components/privateRoute/PrivateRoute';

const Routes = () => {
  const { Layout, routes } = mainLayoutRoutes;

  return (
    <RoutesWrapper>
      {routes.map(({ path, Component }) => {
        const isPrivateRoute = path === USER_PATH;

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
