import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";

import EmptySearch from "../../assets/illustrations/empty-search.svg";



import Button from "../../components/Button/Button";
import ItemCard from "../../components/ItemCard/ItemCard";

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const categories = [
  "Electronics",
  "ID Card",
  "Wallet",
  "Keys",
  "Books",
  "Bottle",
  "Others",
];
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("newest");

  const lostCount = items.filter(
(item)=>item.type==="lost"
).length;

const foundCount = items.filter(
(item)=>item.type==="found"
).length;

const locationCount = new Set(
items.map(item=>item.location)
).size;

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
      if (status) params.append("status", status);
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
  }, [debouncedSearch, category, type, location,status, sort]);

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
       <div className="search-box">

  <span className="search-icon"></span>

  <input
    type="text"
    placeholder="Search lost or found items..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

</div>

<div className="category-chips">

  {categories.map((item) => (

    <button
      key={item}
      type="button"
      className={`chip ${
        category === item ? "active-chip" : ""
      }`}
      onClick={() =>
        setCategory(category === item ? "" : item)
      }
    >
      {item}
    </button>

  ))}

</div>

<div className="filters-row">
          

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All Types</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>


          <select
value={status}
onChange={(e)=>setStatus(e.target.value)}
>

<option value="">
All Status
</option>

<option value="active">
Active
</option>

<option value="claimed">
Claimed
</option>

<option value="returned">
Returned
</option>

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
              setStatus("");
              setSort("newest");
            }}
          >
            Clear Filters
          </button>
        </div>
        <div className="active-filters">

  {category && (
    <button
      className="filter-pill"
      onClick={() => setCategory("")}
    >
      {category} ✕
    </button>
  )}

  {type && (
    <button
      className="filter-pill"
      onClick={() => setType("")}
    >
      {type} ✕
    </button>
  )}

  {status && (
    <button
      className="filter-pill"
      onClick={() => setStatus("")}
    >
      {status} ✕
    </button>
  )}

  {location && (
    <button
      className="filter-pill"
      onClick={() => setLocation("")}
    >
      {location} ✕
    </button>
  )}

</div>
      </section>

      <section className="items-section">
        <div className="stats-grid">

<div className="stat-box">

<div className="stat-icon">

</div>

<h3>{items.length}</h3>

<p>Total Items</p>

</div>

<div className="stat-box">

<div className="stat-icon">

</div>

<h3>{lostCount}</h3>

<p>Lost</p>

</div>

<div className="stat-box">

<div className="stat-icon">

</div>

<h3>{foundCount}</h3>

<p>Found</p>

</div>

<div className="stat-box">

<div className="stat-icon">

</div>

<h3>{locationCount}</h3>

<p>Locations</p>

</div>

</div>
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

<img
  src={EmptySearch}
  alt="No results"
  className="empty-image"
/>

  <h3>No matching items found</h3>

  <p>
    We couldn't find any items matching your search.
    Try adjusting your filters or search with different keywords.
  </p>

  <button
    className="empty-reset-btn"
    onClick={() => {
      setSearch("");
      setCategory("");
      setType("");
      setStatus("");
      setLocation("");
      setSort("newest");
    }}
  >
    Clear All Filters
  </button>

</div>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
