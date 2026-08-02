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
    "Are you sure you want to delete this item?"
  );

  if (!confirmDelete) return;

  try {

    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/items/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setItems((prev) =>
      prev.filter((item) => item._id !== id)
    );

    alert("Item deleted successfully!");

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Failed to delete item."
    );

  }

};


  return (
    <section className="my-items-page">
      <div className="page-header">
        <div>
          <h1>My Items</h1>

          <p>Manage your lost and found posts.</p>
        </div>

        <Link to="/post-lost" className="post-btn">
          + Report New Item
        </Link>
      </div>

      <div className="stats-row">
        <div
          className={`stat-box ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          <h2>{items.length}</h2>
          <p>All Items</p>
        </div>

        <div
          className={`stat-box ${filter === "lost" ? "active" : ""}`}
          onClick={() => setFilter("lost")}
        >
          <h2>{lostItems}</h2>
          <p>Lost Items</p>
        </div>

        <div
          className={`stat-box ${filter === "found" ? "active" : ""}`}
          onClick={() => setFilter("found")}
        >
          <h2>{foundItems}</h2>
          <p>Found Items</p>
        </div>
      </div>

      <div className="toolbar">
        <input
          type="text"
          placeholder="Search your items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

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

    <div className="list-card" key={item._id}>

      <div className="list-image">

        {item.photoUrl ? (
          <img
            src={item.photoUrl}
            alt={item.title}
          />
        ) : (
          <div className="image-placeholder">
            No Image
          </div>
        )}

      </div>

      <div className="list-content">

        <div className="card-top">

          <div>

            <h2>{item.title}</h2>

            <span className={`type-badge ${item.type}`}>
              {item.type}
            </span>

          </div>

          <span className="date">
            {new Date(item.createdAt).toLocaleDateString()}
          </span>

        </div>

        <p className="location">
          📍 {item.location}
        </p>

        <p className="description">
          {item.description}
        </p>

        <div className="card-bottom">

          <span className={`status ${item.status}`}>
            {item.status}
          </span>
<div className="buttons">

  <Link
    to={`/item/${item._id}`}
    className="view-btn"
  >
    View
  </Link>

  <Link
    to={`/edit-item/${item._id}`}
    className="edit-btn"
  >
    Edit
  </Link>

  <button
    className="delete-btn"
    onClick={() => handleDelete(item._id)}
  >
    Delete
  </button>

</div>

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
    </section>
  );
}

export default MyItems;
