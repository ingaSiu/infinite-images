import RegisterForm from './RegisterForm';
import styles from './Register.module.scss';

const Register = () => {
  return (
    <div className={styles.container}>
      <h1>Create Account</h1>
      <div className={styles.formWrapper}>
        <img src="./cat_register.png" alt="standing happy cat" />
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
