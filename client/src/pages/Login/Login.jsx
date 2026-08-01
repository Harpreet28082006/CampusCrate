import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "../../components/Button/Button";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = formData.email.trim();
    const password = formData.password.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      return toast.error("Email is required.");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address.");
    }

    if (!password) {
      return toast.error("Password is required.");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login successful!");

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed.");
    }finally {
  setLoading(false);
}
  };

  return (
    <section className="login-page">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <button
  type="submit"
  disabled={loading}
  className="login-btn"
>
  {loading ? "Logging in..." : "Login"}
</button>
      </form>

      <br />

      <p>
        Don't have an account?{" "}
        <Link to="/register">Register</Link>
      </p>
    </section>
  );
}

export default Login;