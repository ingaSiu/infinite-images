// import * as yup from 'yup';

// import { useForm } from 'react-hook-form';

const RegisterForm = () => {
  return (
    <form>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input type="email" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" />
      </div>

      <div>
        <label>Confirm Password</label>
        <input type="password" />
      </div>

      <button>Register</button>
    </form>
  );
};

export default RegisterForm;
