import { LOGIN_PATH } from '../../routes/consts';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuthContext();

  //TODO problem here. initialle isAuthenticated is null and redirects instantly
  return isAuthenticated ? <>{children}</> : <Navigate to={LOGIN_PATH} />;
};

export default PrivateRoute;
