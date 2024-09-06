import LoginForm from './LoginForm';
import styles from './Login.module.scss';

const Login = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Login Here!</h1>
      <div className={styles.container}>
        <img src="./cat_login.png" alt="cat with red baloon" />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
