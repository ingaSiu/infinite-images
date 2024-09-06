export type Route = {
  path: '/' | '/login' | '/register' | 'user';
  Component: () => JSX.Element;
};
