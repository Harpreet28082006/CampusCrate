import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("rememberEmail") ? true : false,
  );

  const [formData, setFormData] = useState({
    email: localStorage.getItem("rememberEmail") || "",

    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,

      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = formData.email.trim();

    const password = formData.password.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) return toast.error("Please enter your email.");

    if (!emailRegex.test(email))
      return toast.error("Please enter a valid email.");

    if (!password) return toast.error("Please enter your password.");

    if (password.length < 6)
      return toast.error("Password must be at least 6 characters.");

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",

        {
          email,

          password,
        },
      );

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",

        JSON.stringify(data.user),
      );

      if (rememberMe) {
        localStorage.setItem(
          "rememberEmail",

          email,
        );
      } else {
        localStorage.removeItem("rememberEmail");
      }

      toast.success(data.message);

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <h1>CampusCrate</h1>

          <span>Lost & Found Platform</span>
        </div>

        <h2>Welcome Back 👋</h2>

        <p>Login to continue using CampusCrate.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FiMail />

            <input
              type="email"
              name="email"
              placeholder="College Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {/* PASSWORD */}

          <div className="input-group">
            <FiLock />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* REMEMBER */}

          <div className="login-options">
            <label className="remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />

              <span>Remember Me</span>
            </label>

            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                toast("Forgot Password feature coming soon.");
              }}
            >
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? (
              "Signing In..."
            ) : (
              <>
                Sign In
                <FiArrowRight />
              </>
            )}
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <button
          type="button"
          className="google-btn"
          onClick={() => toast("Google Login is not integrated yet.")}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
          />
          Continue with Google
        </button>

        <div className="login-footer">
          <p>
            Don't have an account?
            <Link to="/register">Create Account</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
