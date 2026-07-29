import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchItems() {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/items/my-items",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setItems(data.items);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!isConfirmed) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/items/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Item deleted successfully!");

      fetchItems();
    } catch (error) {
      console.error("Delete Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete item."
      );
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  const totalPosts = items.length;
  const lostItems = items.filter((item) => item.type === "lost").length;
  const foundItems = items.filter((item) => item.type === "found").length;

  return (
    <section className="dashboard">
      <h1>Welcome {user?.name || "User"} 👋</h1>

      <p>Manage your lost and found items from one place.</p>

      <div className="dashboard-stats">
        <div className="card">
          <h2>{loading ? "..." : totalPosts}</h2>
          <p>Total Posts</p>
        </div>

        <div className="card">
          <h2>{loading ? "..." : lostItems}</h2>
          <p>Lost Items</p>
        </div>

        <div className="card">
          <h2>{loading ? "..." : foundItems}</h2>
          <p>Found Items</p>
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="/post-lost">
          <button>+ Report Lost Item</button>
        </Link>

        <Link to="/post-found">
          <button>+ Report Found Item</button>
        </Link>
      </div>

      <h2>My Recent Posts</h2>

      <div className="recent-posts">
        {loading ? (
          <div className="card">
            <h3>Loading...</h3>
          </div>
        ) : items.length > 0 ? (
          items.slice(0, 5).map((item) => (
            <div className="card" key={item._id}>
              <h3>{item.title}</h3>

              <p>
                <strong>Type:</strong> {item.type}
              </p>

              <p>
                <strong>Location:</strong> {item.location}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(item.date).toLocaleDateString()}
              </p>

              <div className="card-actions">
                <Link to={`/edit-item/${item._id}`}>
                  <button>Edit</button>
                </Link>

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
            <p>Your lost and found items will appear here.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Dashboard;