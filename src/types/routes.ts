export type Route = {
  path: '/' | '/login' | '/register' | '/profile/:id' | '/profile/:id/favorites';
  Component: () => JSX.Element;
};
