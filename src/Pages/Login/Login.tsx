import LoginForm from './LoginForm';
import styles from './Login.module.scss';

const Login = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Login Here!</h1>
      <div className={styles.container}>
        <img src="./cat_login.png" alt="sitting cat with heart above its head" />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
