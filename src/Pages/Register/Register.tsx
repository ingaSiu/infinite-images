import RegisterForm from './RegisterForm';
import styles from './Register.module.scss';

const Register = () => {
  return (
    <div className={styles.container}>
      <div>Register</div>
      <RegisterForm />
    </div>
  );
};

export default Register;
