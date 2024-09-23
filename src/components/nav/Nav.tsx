import { FAVORITES_PATH, HOME_PATH, LOGIN_PATH, REGISTER_PATH } from '../../routes/consts';

import Button from '../button/Button';
import styles from './Nav.module.scss';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const { isAuthenticated, logout, user } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div className={styles.navContainer}>
      <div className={styles.left} onClick={() => navigate(HOME_PATH)}>
        <img src="/cat_icon.png" alt="cat icon from pixels" />
        <h2>Images viewing website</h2>
      </div>

      {isAuthenticated ? (
        <div className={styles.right}>
          <span onClick={() => navigate(FAVORITES_PATH)} className={styles.user}>
            Welcome, {user?.username}
          </span>
          <Button variant={true} onClick={() => logout()}>
            Log out
          </Button>
        </div>
      ) : (
        <div className={styles.right}>
          <Button onClick={() => navigate(REGISTER_PATH)} variant={true}>
            Sign Up
          </Button>
          <Button onClick={() => navigate(LOGIN_PATH)} variant={true}>
            Sign In
          </Button>
        </div>
      )}
    </div>
  );
};

export default Nav;
