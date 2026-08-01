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
        `http://localhost:5000/api/items/my-items?page=${page}&limit=5`,
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
      await axios.delete(`http://localhost:5000/api/items/${id}`, {
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

    <div className="dashboard-header">

      <div>
        <h1>
          Welcome back, {user?.name || "User"} 
        </h1>

        <p>
          Manage all your lost and found activity from one place.
        </p>
      </div>

      <div className="dashboard-actions">
        <Link to="/post-lost">
          <button>+ Report Lost</button>
        </Link>

        <Link to="/post-found">
          <button>+ Report Found</button>
        </Link>
      </div>

    </div>

    {/* ================= STATS ================= */}

    <div className="dashboard-stats">

      <div className="stats-card">
        <span className="stats-icon"></span>
        <h2>{loading ? "..." : totalPosts}</h2>
        <p>Total Posts</p>
      </div>

      <div className="stats-card">
        <span className="stats-icon"></span>
        <h2>{loading ? "..." : lostItems}</h2>
        <p>Lost Items</p>
      </div>

      <div className="stats-card">
        <span className="stats-icon"></span>
        <h2>{loading ? "..." : foundItems}</h2>
        <p>Found Items</p>
      </div>

      <div className="stats-card">
        <span className="stats-icon"></span>
        <h2>{loading ? "..." : returnedItems}</h2>
        <p>Returned Items</p>
      </div>

      <div className="stats-card">
        <span className="stats-icon"></span>
        <h2>{loading ? "..." : pendingClaims}</h2>
        <p>Pending Claims</p>
      </div>

      <div className="stats-card">
        <span className="stats-icon"></span>
        <h2>
          {loading
            ? "..."
            : totalPosts === 0
            ? "0%"
            : `${Math.round((returnedItems / totalPosts) * 100)}%`}
        </h2>

        <p>Success Rate</p>
      </div>

    </div>

    {/* ================= RECENT ACTIVITY ================= */}

    <div className="activity-card">

      <div className="section-title">
        <h2>Recent Activity</h2>
      </div>

      {items.length === 0 ? (

        <p className="activity-empty">
          No recent activity yet.
        </p>

      ) : (

        items.slice(0, 4).map((item) => (

          <div className="activity-row" key={item._id}>

            <div className="activity-dot"></div>

            <div>

              <h4>{item.title}</h4>

              <p>

                {item.type === "lost"
                  ? "Lost Item Posted"
                  : "Found Item Posted"}

                •{" "}

                {new Date(item.createdAt).toLocaleDateString()}

              </p>

            </div>

          </div>

        ))

      )}

    </div>

    {/* ================= POSTS ================= */}

    <div className="section-title">

      <h2>Recent Posts</h2>

    </div>

    <div className="recent-posts">

      {loading ? (

        <div className="card">
          <h3>Loading...</h3>
        </div>

      ) : items.length > 0 ? (

        items.map((item) => (

          <div className="card" key={item._id}>

            <div className="item-card-top">

              <div className="item-info">

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
                      item.type === "lost"
                        ? "lost-tag"
                        : "found-tag"
                    }
                  >
                    {item.type.toUpperCase()}
                  </span>

                </p>

              </div>

              {item.photoUrl && (

                <img
                  src={item.photoUrl}
                  alt={item.title}
                  className="item-image"
                />

              )}

            </div>

            <div className="card-actions">

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

              <button
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>

            </div>

          </div>

        ))

      ) : (

        <div className="card">

          <h3>No Posts Yet</h3>

          <p>
            Your lost and found items will appear here.
          </p>

        </div>

      )}

    </div>

    {totalPages > 1 && (

      <div className="pagination">

        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
        >
          Previous
        </button>

        {Array.from(
          { length: totalPages },
          (_, index) => (

            <button
              key={index}
              className={
                currentPage === index + 1
                  ? "active-page"
                  : ""
              }
              onClick={() =>
                setCurrentPage(index + 1)
              }
            >
              {index + 1}
            </button>

          )
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
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
