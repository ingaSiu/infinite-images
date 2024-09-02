const LoginForm = () => {
  return (
    <form>
      <div>
        <label htmlFor="email">User Email</label>
        <input type="email" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" />
      </div>

      <button>Login</button>
    </form>
  );
};

export default LoginForm;
