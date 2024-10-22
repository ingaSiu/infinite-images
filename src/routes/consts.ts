import FavoritesPage from '../Pages/FavoritesPage/FavoritesPage';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import MainLayout from '../layout/MainLayout';
import Register from '../Pages/Register/Register';
import UserLayout from '../layout/UserLayout';
import UserPage from '../Pages/UserPage/UserPage';

export const HOME_PATH = '/';
export const LOGIN_PATH = '/login';
export const REGISTER_PATH = '/register';
export const USER_PATH = '/profile/:id';
export const FAVORITES_PATH = '/profile/:id/favorites';

export const mainLayoutRoutes = {
  Layout: MainLayout,
  routes: [
    { path: HOME_PATH, Component: Home },
    { path: REGISTER_PATH, Component: Register },
    { path: LOGIN_PATH, Component: Login },
  ],
};

export const userLayoutRoutes = {
  Layout: UserLayout,
  userRoutes: [
    { path: USER_PATH, Component: UserPage },
    { path: FAVORITES_PATH, Component: FavoritesPage },
  ],
};
