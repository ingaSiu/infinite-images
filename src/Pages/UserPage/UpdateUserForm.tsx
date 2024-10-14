import Button from '../../components/button/Button';
import styles from './UserPage.module.scss';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const UpdateUserForm = () => {
  const { user } = useAuthContext();
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
    console.log(data);
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
