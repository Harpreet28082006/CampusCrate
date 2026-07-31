import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
    fetchMyItems();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        "http://localhost:5000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUser(data.user);
      setStats(data.stats);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyItems = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        "http://localhost:5000/api/items/my-items",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setItems(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className="profile-page">
      <div className="profile-header">
        <div className="profile-left">
          {user.profilePhoto ? (
            <img
              src={user.profilePhoto}
              alt="Profile"
              className="avatar-image"
            />
          ) : (
            <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
          )}

          <div className="profile-details">
            <h1>{user.name}</h1>

            <p className="profile-email">{user.email}</p>

            <div className="profile-meta">
              <span> {user.college || "College not added"}</span>

              <span>
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <button className="edit-btn" onClick={() => navigate("/edit-profile")}>
          Edit Profile
        </button>{" "}
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <span className="stat-icon"></span>
          <h2>{stats.lostItems}</h2>
          <p>Lost Items</p>
        </div>

        <div className="stat-card">
          <span className="stat-icon"></span>
          <h2>{stats.foundItems}</h2>
          <p>Found Items</p>
        </div>

        <div className="stat-card">
          <span className="stat-icon"></span>
          <h2>{stats.claimsMade}</h2>
          <p>Claims Made</p>
        </div>

        <div className="stat-card">
          <span className="stat-icon"></span>
          <h2>{stats.approvedClaims}</h2>
          <p>Approved</p>
        </div>
      </div>

      <div className="my-posts">
        <div className="section-header">
          <h2>My Items</h2>

          <button
            className="view-all-btn"
            onClick={() => navigate("/my-items")}
          >
            View All
          </button>
        </div>

        {items.length === 0 ? (
          <div className="empty-posts">
            <h3>No Items Yet</h3>
            <p>You haven't posted any lost or found items.</p>
          </div>
        ) : (
          <div className="items-list">
            {items.slice(0, 3).map((item) => (
              <div className="item-row" key={item._id}>
                <div className="item-image">
                  {item.photoUrl ? (
                    <img
                      src={item.photoUrl}
                      alt={item.title}
                      className="item-thumb"
                    />
                  ) : (
                    <div className="item-placeholder"></div>
                  )}
                </div>

                <div className="item-content">
                  <span className={`item-type ${item.type}`}>{item.type}</span>

                  <h3>{item.title}</h3>

                  <div className="item-meta">
                    <p> {item.location}</p>

                    <p>{new Date(item.createdAt).toLocaleDateString()}</p>
                  </div>

                  <span className={`item-status ${item.status}`}>
                    {item.status}
                  </span>
                </div>

                <button className="menu-btn">⋮</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Profile;
