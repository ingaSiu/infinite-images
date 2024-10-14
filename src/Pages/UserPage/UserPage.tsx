import { FAVORITES_PATH, USER_PATH } from '../../routes/consts';

import Button from '../../components/button/Button';
import styles from './UserPage.module.scss';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <section className={styles.userPages}>
        <p onClick={() => navigate(FAVORITES_PATH)}>My favorites</p>
        <p onClick={() => navigate(USER_PATH)}>My profile</p>
      </section>

      <div>
        <h1>My profile details</h1>
        <form>
          <div className={styles.inputContainer}>
            <input type="text" placeholder="Username" />
          </div>

          <div className={styles.inputContainer}>
            <input type="email" placeholder="Email" />
          </div>

          <div className={styles.inputContainer}>
            <input type="password" placeholder="Password" />
          </div>

          <div className={styles.inputContainer}>
            <input type="password" placeholder="Confirm password" />
          </div>

          <Button variant={true}>Update</Button>
        </form>
      </div>
    </div>
  );
};

export default UserPage;
