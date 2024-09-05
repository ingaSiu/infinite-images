import * as yup from 'yup';

import { BASE_URL } from '../../api/baseApi';
import Button from '../../components/button/Button';
import { EMAIL_REGEX } from '../../utils/regex';
import { HOME_PATH } from '../../routes/consts';
import axios from 'axios';
import styles from './Register.module.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: RegisterFormData) => {
    const { email, username, password } = data;

    try {
      await axios.post(
        `${BASE_URL}users/`,
        { email, username, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      navigate(HOME_PATH);
    } catch (error) {
      console.error(error);
      alert('Registration failed. Please try again');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputContainer}>
        {/* <label htmlFor="username">Username</label> */}
        <input type="text" {...register('username')} placeholder="Username" />
        {errors.username && <p className={styles.errorMsg}>{errors.username.message}</p>}
      </div>

      <div className={styles.inputContainer}>
        {/* <label htmlFor="email">Email</label> */}
        <input type="email" {...register('email')} placeholder="Email" />
        {errors.email && <p className={styles.errorMsg}>{errors.email.message}</p>}
      </div>

      <div className={styles.inputContainer}>
        {/* <label htmlFor="password">Password</label> */}
        <input type="password" {...register('password')} placeholder="Password" />
        {errors.password && <p className={styles.errorMsg}>{errors.password.message}</p>}
      </div>

      <div className={styles.inputContainer}>
        {/* <label>Confirm Password</label> */}
        <input type="password" {...register('confirmPassword')} placeholder="Confirm password" />
        {errors.confirmPassword && <p className={styles.errorMsg}>{errors.confirmPassword.message}</p>}
      </div>

      <Button variant={true}>Register</Button>
    </form>
  );
};

export default RegisterForm;
