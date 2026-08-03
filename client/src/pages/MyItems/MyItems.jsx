import ViewClaimsModal from "../../components/ViewClaimsModal/ViewClaimsModal";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MyItems.css";

function MyItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const [selectedItem, setSelectedItem] = useState(null);
  const [showClaimsModal, setShowClaimsModal] = useState(false);

  useEffect(() => {
    fetchMyItems();
  }, []);

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
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = useMemo(() => {
    let filtered = [...items];

    if (filter !== "all") {
      filtered = filtered.filter((item) => item.type === filter);
    }

    if (search.trim()) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }

      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    return filtered;
  }, [items, filter, search, sortBy]);

  const lostItems = items.filter((i) => i.type === "lost").length;
  const foundItems = items.filter((i) => i.type === "found").length;

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?",
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setItems((prev) => prev.filter((item) => item._id !== id));

      alert("Item deleted successfully!");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to delete item.");
    }
  };

  const handleReturned = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `http://localhost:5000/api/items/${id}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await fetchMyItems();

      alert("Item marked as returned!");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message || "Unable to mark item as returned.",
      );
    }
  };

  return (
    <section className="my-items-page">
      <div className="myitems-header">
        <div>
          <h1>My Items</h1>

          <p>Manage all your lost and found reports in one place.</p>
        </div>

        <Link to="/post-lost" className="new-report-btn">
          + New Report
        </Link>
      </div>

      <div className="stats-row">
        <div className="mini-stat">
          <div className="mini-icon">📦</div>

          <div>
            <h3>{items.length}</h3>

            <p>Total Posts</p>
          </div>
        </div>

        <div className="mini-stat">
          <div className="mini-icon">🔵</div>

          <div>
            <h3>{lostItems}</h3>

            <p>Lost</p>
          </div>
        </div>

        <div className="mini-stat">
          <div className="mini-icon">🟠</div>

          <div>
            <h3>{foundItems}</h3>

            <p>Found</p>
          </div>
        </div>

        <div className="mini-stat">
          <div className="mini-icon">✅</div>

          <div>
            <h3>{items.filter((i) => i.status === "returned").length}</h3>

            <p>Returned</p>
          </div>
        </div>
      </div>

      <div className="items-toolbar">
        <input
          type="text"
          placeholder="Search your items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Types</option>

          <option value="lost">Lost</option>

          <option value="found">Found</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="newest">Newest First</option>

          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {filteredItems.length === 0 ? (
        <div className="empty-state">
          <h2>No Items Found</h2>
          <p>Try changing the search or filter.</p>
        </div>
      ) : (
        <div className="items-list">
          {filteredItems.map((item) => (
            <div className="myitem-card" key={item._id}>
              {/* LEFT */}

              <div className="item-left">
                <img
                  src={item.photoUrl}
                  alt={item.title}
                  className="item-photo"
                />
              </div>

              {/* CENTER */}

              <div className="item-center">
                <h2>{item.title}</h2>

                <span className="category-chip">{item.category}</span>

                <p>📍 {item.location}</p>

                <p>📅 {new Date(item.date).toLocaleDateString()}</p>
              </div>

              {/* TIMELINE */}

              <div className="item-timeline">
                <div className="timeline-step completed">
                  <span></span>

                  <div>
                    <h5>Posted</h5>

                    <p>{new Date(item.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div
                  className={`timeline-step ${
                    item.status !== "active" ? "completed" : ""
                  }`}
                >
                  <span></span>

                  <div>
                    <h5>Claimed</h5>
                  </div>
                </div>

                <div
                  className={`timeline-step ${
                    item.status === "returned" ? "completed" : ""
                  }`}
                >
                  <span></span>

                  <div>
                    <h5>Returned</h5>
                  </div>
                </div>
              </div>

              {/* RIGHT */}

              <div className="item-right">
                <span className={`status-badge ${item.status}`}>
                  {item.status}
                </span>

                <div className="action-buttons">
                  <Link to={`/item/${item._id}`} className="action-link">
                    View
                  </Link>

                  {item.status === "returned" ? (
                    <span className="action-link disabled-link">Edit</span>
                  ) : (
                    <Link to={`/edit-item/${item._id}`} className="action-link">
                      Edit
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      setSelectedItem(item._id);
                      setShowClaimsModal(true);
                    }}
                  >
                    Claims
                  </button>

                  {item.qrCode ? (
                    <a
                      href={item.qrCode}
                      download={`${item.title}-QR.png`}
                      className="action-link"
                    >
                      QR
                    </a>
                  ) : (
                    <button disabled>QR</button>
                  )}

                  <button
                    onClick={() => handleReturned(item._id)}
                    disabled={item.status === "returned"}
                  >
                    {item.status === "returned" ? "Returned" : "Mark Returned"}
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="items-footer">
        <p>
          Showing {filteredItems.length} of {items.length} items
        </p>

        <div className="pagination">
          <button disabled>← </button>

          <button className="active-page">1</button>

          <button disabled> →</button>
        </div>
      </div>
      {showClaimsModal && (
        <ViewClaimsModal
          itemId={selectedItem}
          onClose={() => {
            setShowClaimsModal(false);
            setSelectedItem(null);
            fetchMyItems();
          }}
        />
      )}
    </section>
  );
}

export default MyItems;
