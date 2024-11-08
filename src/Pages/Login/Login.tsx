import LoginForm from './LoginForm';
import { REGISTER_PATH } from '../../routes/consts';
import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <h1>Login Here!</h1>
      <div className={styles.container}>
        <img src="./cat_login.png" alt="sitting cat with heart above its head" />

        <div className={styles.formContainer}>
          <LoginForm />
          <span>Don't have an account?</span>
          <p onClick={() => navigate(REGISTER_PATH)} className={styles.linkToRegister}>
            Sign up
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
