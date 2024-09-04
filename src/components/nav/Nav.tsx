import { HOME_PATH, LOGIN_PATH, REGISTER_PATH } from '../../routes/consts';

import Button from '../button/Button';
import styles from './Nav.module.scss';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.navContainer}>
      <div className={styles.left} onClick={() => navigate(HOME_PATH)}>
        <img src="./cat_icon.png" alt="cat icon from pixels" />
        <h2>Images viewing website</h2>
      </div>

      <div className={styles.right}>
        <Button onClick={() => navigate(REGISTER_PATH)}>Sign Up</Button>
        <Button onClick={() => navigate(LOGIN_PATH)}>Sign In</Button>
      </div>
    </div>
  );
};

export default Nav;
