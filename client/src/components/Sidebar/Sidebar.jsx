import {
  LayoutDashboard,
  PackageSearch,
  User,
  Plus,
  LogOut,
  Search,
  CircleHelp,
  Bell,
  Settings,
  Crown,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      {/* Logo */}

      <div className="sidebar-logo">
        <div className="logo-box">📦</div>

        <div>
          <h2>CampusCrate</h2>
          <p>Lost • Found</p>
        </div>
      </div>

      {/* Create Card */}
      <div className="create-card">
        <div className="create-text">
          <h4>Create</h4>

          <span>New Report</span>
        </div>

        <button onClick={() => navigate("/post-lost")}>
          <Plus size={18} />
        </button>
      </div>

      {/* Menu */}

      <nav className="sidebar-menu">
        <NavLink to="/">
          <Home size={18} />
          Home
        </NavLink>

        {/* <NavLink to="/dashboard">
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink> */}

        <NavLink to="/my-items">
          <PackageSearch size={18} />
          My Items
        </NavLink>

        <NavLink to="/post-lost">
          <Search size={18} />
          Report Lost
        </NavLink>

        <NavLink to="/post-found">
          <CircleHelp size={18} />
          Report Found
        </NavLink>


         <NavLink to="/messages">💬 Messages</NavLink>


      
        <NavLink to="/notifications">
          <Bell size={18} />
          Notifications
        </NavLink>

       

        <NavLink to="/profile">
          <User size={18} />
          Profile
        </NavLink>

        <NavLink to="/settings">
          <Settings size={18} />
          Settings
        </NavLink>
      </nav>

      {/* <div className="premium-card">
        <Crown size={28} />

        <h3>Go Premium</h3>

        <p>Unlock premium CampusCrate features and priority support.</p>

        <button>Upgrade Now</button>
      </div> */}

      <button className="logout-side" onClick={logout}>
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
