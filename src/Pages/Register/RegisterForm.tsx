import * as yup from 'yup';

import { EMAIL_REGEX } from '../../utils/regex';
import axios from 'axios';
import styles from './Register.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  username: yup.string().required('Username field is required.'),
  email: yup.string().required('Email is required.').matches(EMAIL_REGEX, 'Invalid email address.'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Your passwords do not match.'),
});

type RegisterFormData = yup.InferType<typeof schema>;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: yupResolver(schema) });

  const onSubmit = () => {};
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" {...register('username')} />
        {errors.username && <p className={styles.errorMsg}>{errors.username.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input type="email" {...register('email')} />
        {errors.email && <p className={styles.errorMsg}>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" {...register('password')} />
        {errors.password && <p className={styles.errorMsg}>{errors.password.message}</p>}
      </div>

      <div>
        <label>Confirm Password</label>
        <input type="password" {...register('confirmPassword')} />
        {errors.confirmPassword && <p className={styles.errorMsg}>{errors.confirmPassword.message}</p>}
      </div>

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
