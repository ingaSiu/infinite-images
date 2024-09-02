import * as yup from 'yup';

import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const schema = yup.object().shape({
  email: yup.string().required('Email is required').matches(EMAIL_REGEX, 'Invalid email address'),
  password: yup.string().required('Password is required.'),
});

type LoginData = yup.InferType<typeof schema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginData>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: LoginData) => {
    const { email, password } = data;

    try {
      await axios.post(
        `http://localhost:5000/api/users/auth`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      reset();
      alert('Logged in succesfully');
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">User Email</label>
        <input type="email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" {...register('password')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <button>Login</button>
    </form>
  );
};

export default LoginForm;