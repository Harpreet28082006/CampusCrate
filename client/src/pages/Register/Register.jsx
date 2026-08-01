import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "../../components/Button/Button";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    college: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const password = formData.password.trim();
    const college = formData.college.trim();

    if (!name) {
      return toast.error("Name is required.");
    }

    if (name.length < 3) {
      return toast.error("Name must be at least 3 characters.");
    }

    if (name.length > 30) {
      return toast.error("Name cannot exceed 30 characters.");
    }

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

    if (college && college.length < 2) {
      return toast.error("Please enter a valid college name.");
    }

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
          college,
        }
      );

      toast.success("Registration successful!");

      navigate("/login");
    } catch (err) {
  toast.error(
    err.response?.data?.message || "Registration failed."
  );
} finally {
  setLoading(false);
}
  };

  return (
    <section className="register-page">
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder="College Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="text"
          name="college"
          placeholder="College Name"
          value={formData.college}
          onChange={handleChange}
        />

        <br />
        <br />

        <button
  type="submit"
  className="register-btn"
  disabled={loading}
>
  {loading ? "Registering..." : "Register"}
</button>
      </form>

      <br />

      <p>
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>
    </section>
  );
}

export default Register;