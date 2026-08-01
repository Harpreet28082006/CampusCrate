import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";

import Button from "../../components/Button/Button";
import ItemCard from "../../components/ItemCard/ItemCard";

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("newest");

  async function fetchItems() {
    setLoading(true);

    try {
      const params = new URLSearchParams();

      if (debouncedSearch) {
        params.append("search", debouncedSearch);
      }
      if (category) params.append("category", category);
      if (type) params.append("type", type);
      if (location) params.append("location", location);
      params.append("sort", sort);

      const { data } = await axios.get(
        `http://localhost:5000/api/items?${params.toString()}`,
      );

      setItems(data.items);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, category, type, location, sort]);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">
            Trusted Campus Lost & Found Platform
          </span>

          <h1>
            Lost something
            <br />
            on campus?
          </h1>

          <p>
            We help students report lost belongings, discover found items and
            reconnect with their rightful owners — quickly and securely.
          </p>

          <div className="hero-buttons">
            <Link to="/post-lost">
              <Button text="Report Lost" />
            </Link>

            <Link to="/post-found">
              <Button text="Report Found" />
            </Link>
          </div>
        </div>
      </section>

      <section className="advanced-search">
        <input
          type="text"
          placeholder=" Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="filters-row">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="ID Card">ID Card</option>
            <option value="Wallet">Wallet</option>
            <option value="Keys">Keys</option>
            <option value="Books">Books</option>
            <option value="Bottle">Bottle</option>
            <option value="Others">Others</option>
          </select>

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All Types</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>

          <input
            type="text"
            placeholder=" Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>

          <button
            type="button"
            className="clear-btn"
            onClick={() => {
              setSearch("");
              setCategory("");
              setType("");
              setLocation("");
              setSort("newest");
            }}
          >
            Clear Filters
          </button>
        </div>
      </section>

      <section className="items-section">
        <div className="section-heading">
          <div>
            <h2>Recently Added Items</h2>

            <p className="result-count">
              {items.length} item{items.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <Link to="/dashboard">View All</Link>
        </div>

        <div className="items-grid">
          {loading ? (
            <div className="loading-container">
              <div className="loader"></div>
            </div>
          ) : items.length > 0 ? (
            items.map((item) => (
              <ItemCard
                key={item._id}
                id={item._id}
                title={item.title}
                location={item.location}
                date={new Date(item.date).toLocaleDateString()}
                photoUrl={item.photoUrl}
                type={item.type}
                category={item.category}
              />
            ))
          ) : (
            <div className="empty-state">
              <h3>No Items Found</h3>

              <p>Try changing your search or filters.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
