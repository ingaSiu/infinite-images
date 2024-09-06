import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import MainLayout from '../layout/MainLayout';
import Register from '../Pages/Register/Register';

export const HOME_PATH = '/';
export const LOGIN_PATH = '/login';
export const REGISTER_PATH = '/register';

export const mainLayoutRoutes = {
  Layout: MainLayout,
  routes: [
    { path: HOME_PATH, Component: Home },
    { path: REGISTER_PATH, Component: Register },
    { path: LOGIN_PATH, Component: Login },
  ],
};
