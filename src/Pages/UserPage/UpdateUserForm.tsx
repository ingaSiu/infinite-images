import { BASE_URL } from '../../api/baseApi';
import Button from '../../components/button/Button';
import httpClient from '../../api/httpClient';
import styles from './UserPage.module.scss';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  username: string;
  email: string;
  password?: string;
  confirmPassword?: string;
};

const UpdateUserForm = () => {
  const { user, setUser } = useAuthContext();
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    reset({
      username: user?.username || '',
      email: user?.email || '',
      password: '',
      confirmPassword: '',
    });
  }, [user, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      if (data.password !== data.confirmPassword) {
        alert('Passwords do not match');
        return;
      } else {
        const response = await httpClient.put(`${BASE_URL}users/profile`, {
          username: data.username,
          email: data.email,
          password: data.password ? data.password : undefined,
        });

        if (response.data) {
          setUser(response.data);
          alert('Profile updated successfully');
        }
      }
    } catch (error) {
      console.error(error);
      alert('Failed to update profile');
    }
  };
  return (
    <div>
      <h1>My profile details</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <input type="text" placeholder="Username" {...register('username')} />
        </div>

        <div className={styles.inputContainer}>
          <input type="email" placeholder="Email" {...register('email')} />
        </div>

        <div className={styles.inputContainer}>
          <input type="password" placeholder="Password" {...register('password')} />
        </div>

        <div className={styles.inputContainer}>
          <input type="password" placeholder="Confirm password" {...register('confirmPassword')} />
        </div>

        <Button variant={true}>Update</Button>
      </form>
    </div>
  );
};

export default UpdateUserForm;
