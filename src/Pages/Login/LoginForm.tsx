import * as yup from 'yup';

import Button from '../../components/button/Button';
import { EMAIL_REGEX } from '../../utils/regex';
import { FAVORITES_PATH } from '../../routes/consts';
import styles from './Login.module.scss';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  email: yup.string().required('Email is required').matches(EMAIL_REGEX, 'Invalid email address'),
  password: yup.string().required('Password is required'),
});

type LoginData = yup.InferType<typeof schema>;

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginData>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: LoginData) => {
    const { email, password } = data;

    try {
      login(email, password);
      reset();
      navigate(FAVORITES_PATH);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputWrapper}>
        <input type="email" {...register('email')} placeholder="Email" />
        {errors.email && <p className={styles.errorMsg}>{errors.email.message}</p>}
      </div>

      <div className={styles.inputWrapper}>
        <input type="password" {...register('password')} placeholder="Password" />
        {errors.password && <p className={styles.errorMsg}>{errors.password.message}</p>}
      </div>

      <Button variant={true}>Login</Button>
    </form>
  );
};

export default LoginForm;
