import "./Register.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import {
  FiUser,
  FiMail,
  FiLock,
  FiBook,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";

function Register() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({

    name: "",

    email: "",

    college: "",

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

    const {

      name,

      email,

      password,

      college,

    } = formData;

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim())
      return toast.error("Enter your name");

    if (!college.trim())
      return toast.error("Enter your college");

    if (!emailRegex.test(email))
      return toast.error("Enter valid email");

    if (password.length < 6)
      return toast.error(
        "Password must be at least 6 characters."
      );

    try {

      setLoading(true);

      await axios.post(

        "https://campuscrate-1vil.onrender.com/api/auth/register",

        {

          name,

          email,

          password,

          college,

        }

      );

      toast.success(

        "Account Created Successfully 🎉"

      );

      navigate("/login");

    } catch (err) {

      toast.error(

        err.response?.data?.message ||

        "Registration Failed"

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <section className="register-page">

      <div className="register-card">

        <div className="register-logo">

          <h1>

            CampusCrate

          </h1>

          <span>

            Lost & Found Platform

          </span>

        </div>

        <h2>

          Create Account ✨

        </h2>

        <p>

          Join CampusCrate and reconnect lost belongings.

        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <FiUser />

            <input

              type="text"

              name="name"

              placeholder="Full Name"

              value={formData.name}

              onChange={handleChange}

            />

          </div>

          <div className="input-group">

            <FiBook />

            <input

              type="text"

              name="college"

              placeholder="College Name"

              value={formData.college}

              onChange={handleChange}

            />

          </div>

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
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <FiEyeOff />
              ) : (
                <FiEye />
              )}
            </button>

          </div>

          <button
            type="submit"
            className="register-btn"
            disabled={loading}
          >

            {loading ? (

              "Creating Account..."

            ) : (

              <>
                Create Account
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
          onClick={() =>
            toast("Google Sign Up will be added later.")
          }
        >

          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
          />

          Continue with Google

        </button>

        <div className="register-footer">

          <p>

            Already have an account?

            <Link to="/login">

              Sign In

            </Link>

          </p>

        </div>

      </div>

    </section>

  );

}

export default Register;