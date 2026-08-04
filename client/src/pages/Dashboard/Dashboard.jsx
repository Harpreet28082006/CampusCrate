import ViewClaimsModal from "../../components/ViewClaimsModal/ViewClaimsModal";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  const [lostItems, setLostItems] = useState(0);
  const [foundItems, setFoundItems] = useState(0);
  const [returnedItems, setReturnedItems] = useState(0);
  const [pendingClaims, setPendingClaims] = useState(0);

  const [selectedItem, setSelectedItem] = useState(null);
  const [showClaimsModal, setShowClaimsModal] = useState(false);

  async function fetchItems(page = 1) {
    try {
      const { data } = await axios.get(
        `https://campuscrate-1vil.onrender.com/api/items/my-items?page=${page}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setItems(data.items);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      setTotalPosts(data.totalItems);
      setLostItems(data.totalLostItems);
      setFoundItems(data.totalFoundItems);
      setReturnedItems(data.totalReturnedItems);
      setPendingClaims(data.pendingClaims);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?",
    );

    if (!isConfirmed) return;

    try {
      await axios.delete(`https://campuscrate-1vil.onrender.com/api/items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Item deleted successfully!");

      fetchItems(currentPage);
    } catch (error) {
      console.error("Delete Error:", error);

      alert(error.response?.data?.message || "Failed to delete item.");
    }
  }

  useEffect(() => {
    fetchItems(currentPage);
  }, [currentPage]);

  return (
    <section className="dashboard">
      {/* ================= HEADER ================= */}

      <div className="hero-banner">
        <div className="hero-left">
          <span className="hero-date">Dashboard</span>

          <h1>Hi, {user?.name?.split(" ")[0] || "User"}</h1>

          <p>Ready to reconnect people with their belongings?</p>

          <div className="hero-buttons">
            <Link to="/post-lost">
              <button className="hero-btn lost-btn">Report Lost</button>
            </Link>

            <Link to="/post-found">
              <button className="hero-btn found-btn">Report Found</button>
            </Link>
          </div>
        </div>

       
      </div>

      {/* ================= STATS ================= */}

      <div className="stats-grid">
        <div className="stats-card ">
          <div className="card-icon">📊</div>

          <div>
            <h2>{loading ? "..." : totalPosts}</h2>
            <p>Total Posts</p>
          </div>
        </div>

        <div className="stats-card ">
          <div className="card-icon">📍</div>

          <div>
            <h2>{loading ? "..." : lostItems}</h2>
            <p>Lost Items</p>
          </div>
        </div>

        <div className="stats-card ">
          <div className="card-icon">🎒</div>

          <div>
            <h2>{loading ? "..." : foundItems}</h2>
            <p>Found Items</p>
          </div>
        </div>

        <div className="stats-card ">
          <div className="card-icon">✅</div>

          <div>
            <h2>{loading ? "..." : returnedItems}</h2>
            <p>Returned</p>
          </div>
        </div>
      </div>

      {/* ================= RECENT ACTIVITY ================= */}

      <div className="dashboard-overview">
        <div className="mini-card pending-card">
          <div className="mini-icon">📩</div>

          <div>
            <h3>{loading ? "..." : pendingClaims}</h3>

            <p>Pending Claims</p>
          </div>
        </div>

        <div className="mini-card success-card">
          <div className="mini-icon">🏆</div>

          <div>
            <h3>
              {loading
                ? "..."
                : totalPosts === 0
                  ? "0%"
                  : `${Math.round((returnedItems / totalPosts) * 100)}%`}
            </h3>

            <p>Success Rate</p>
          </div>
        </div>
      </div>

      <div className="activity-panel">
        <div className="section-header">
          <h2>Recent Activity</h2>

          <span>Latest Updates</span>
        </div>

        {items.length === 0 ? (
          <div className="empty-activity">
            <h4>No Recent Activity</h4>

            <p>Your latest updates will appear here.</p>
          </div>
        ) : (
          items.slice(0, 4).map((item) => (
            <div className="activity-item" key={item._id}>
              <div className={`activity-circle ${item.type}`}>
                {item.type === "lost" ? "📍" : "🎒"}
              </div>

              <div className="activity-content">
                <h4>{item.title}</h4>

                <p>{item.location}</p>
              </div>

              <span className="activity-date">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>

      {/* ================= POSTS ================= */}

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Posts</h2>

          <span>{totalPosts} Total</span>
        </div>

        <div className="recent-posts">
          {loading ? (
            <div className="card">
              <h3>Loading...</h3>
            </div>
          ) : items.length > 0 ? (
            items.map((item) => (
              <div className="post-card" key={item._id}>
                <div className="post-left">
                  {item.photoUrl ? (
                    <img
                      src={item.photoUrl}
                      alt={item.title}
                      className="post-image"
                    />
                  ) : (
                    <div className="post-placeholder">📦</div>
                  )}

                  <div className="post-info">
                    <h3>{item.title}</h3>

                    <p>
                      <strong>Location:</strong> {item.location}
                    </p>

                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(item.date).toLocaleDateString()}
                    </p>

                    <p>
                      <strong>Category:</strong> {item.category}
                    </p>

                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={
                          item.type === "lost" ? "lost-tag" : "found-tag"
                        }
                      >
                        {item.type.toUpperCase()}
                      </span>
                    </p>
                  </div>

                </div>

                <div className="post-actions">
                  <Link to={`/edit-item/${item._id}`}>
                    <button>Edit</button>
                  </Link>

                  <button
                    onClick={() => {
                      setSelectedItem(item._id);
                      setShowClaimsModal(true);
                    }}
                  >
                    View Claims
                  </button>

                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <div className="card">
              <h3>No Posts Yet</h3>

              <p>Your lost and found items will appear here.</p>
            </div>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active-page" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}

      {showClaimsModal && (
        <ViewClaimsModal
          itemId={selectedItem}
          onClose={() => {
            setShowClaimsModal(false);
            setSelectedItem(null);
            fetchItems(currentPage);
          }}
        />
      )}
    </section>
  );
}

export default Dashboard;
