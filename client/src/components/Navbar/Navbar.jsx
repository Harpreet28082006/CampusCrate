import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">

      <Link
        to="/"
        className="logo"
        onClick={closeMenu}
      >
        <span className="logo-icon">📦</span>

        <div className="logo-text">
          <h2>CampusCrate</h2>
          <span>Lost • Found • Reconnected</span>
        </div>
      </Link>

      {/* Mobile Menu Button */}

      <button
        className="menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>

        <li>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
        </li>

        <li>
          <Link to="/post-lost" onClick={closeMenu}>
            Report Lost
          </Link>
        </li>

        <li>
          <Link to="/post-found" onClick={closeMenu}>
            Report Found
          </Link>
        </li>

        {token ? (
          <>
            <li>
              <Link
                to="/dashboard"
                onClick={closeMenu}
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/profile"
                onClick={closeMenu}
              >
                Profile
              </Link>
            </li>

            <li>
              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                onClick={closeMenu}
              >
                Login
              </Link>
            </li>

            <li>
              <Link
                to="/register"
                onClick={closeMenu}
              >
                Register
              </Link>
            </li>
          </>
        )}

      </ul>

    </nav>
  );
}

export default Navbar;