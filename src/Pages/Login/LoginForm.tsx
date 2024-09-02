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

type FormData = yup.InferType<typeof schema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = () => {};
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">User Email</label>
        <input type="email" {...register('email')} />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" {...register('password')} />
      </div>

      <button>Login</button>
    </form>
  );
};

export default LoginForm;
