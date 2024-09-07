export type Route = {
  path: '/' | '/login' | '/register' | '/users/profile/:id';
  Component: () => JSX.Element;
};
