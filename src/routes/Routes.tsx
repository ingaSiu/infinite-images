import { Route, Routes as RoutesWrapper } from 'react-router-dom';
import { mainLayoutRoutes, userLayoutRoutes } from './consts';

import PrivateRoute from '../components/privateRoute/PrivateRoute';

const Routes = () => {
  const { Layout: MainLayout, routes } = mainLayoutRoutes;
  const { Layout: UserLayout, userRoutes } = userLayoutRoutes;

  return (
    <RoutesWrapper>
      {routes.map(({ path, Component }) => {
        return (
          <Route
            key={path}
            path={path}
            element={
              <MainLayout>
                <Component />
              </MainLayout>
            }
          />
        );
      })}

      {userRoutes.map(({ path, Component }) => {
        return (
          <Route
            key={path}
            path={path}
            element={
              <PrivateRoute>
                <UserLayout>
                  <Component />
                </UserLayout>
              </PrivateRoute>
            }
          />
        );
      })}
    </RoutesWrapper>
  );
};

export default Routes;
