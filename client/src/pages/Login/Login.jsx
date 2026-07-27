import Button from "../../components/Button/Button";

function Login() {
  return (
    <section>
      <h1>Login</h1>

      <form>
        <input
          type="email"
          placeholder="Enter Email"
        />

        <br /><br />

        <input
          type="password"
          placeholder="Enter Password"
        />

        <br /><br />

        <Button text="Login" />
      </form>
    </section>
  );
}

export default Login;