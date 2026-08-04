import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HeroImage from "../../assets/illustrations/image.png";
import "./Home.css";

import EmptySearch from "../../assets/illustrations/empty-search.svg";

import Button from "../../components/Button/Button";
import ItemCard from "../../components/ItemCard/ItemCard";

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [totalItems, setTotalItems] = useState(0);

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

  //

  async function fetchItems(page = currentPage) {
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

      params.append("page", page);
      params.append("limit", 6);

      const { data } = await axios.get(
        `https://campuscrate-1vil.onrender.com/api/items?${params.toString()}`,
      );
      console.log("Items Returned:", data.items.length);
console.log("Total Pages:", data.totalPages);
console.log("Total Items:", data.totalItems);

      setItems(data.items);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
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
    fetchItems(currentPage);
  }, [debouncedSearch, category, type, location, status, sort, currentPage]);

  return (
    <>
      <div className="announcement-bar">
        <div className="announcement-text">
          🚀 CampusCrate Beta is now live for all college students.
        </div>

        {/* <button className="announcement-btn">Explore</button> */}
      </div>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-left">
            <span className="hero-badge">
              Trusted Campus Lost & Found Platform
            </span>
            <h1>
              Reconnect Lost
              <br />
              <span>Belongings Faster.</span>
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
          <div className="hero-right">
            <img src={HeroImage} alt="" />
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
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="category-chips">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={`chip ${category === item ? "active-chip" : ""}`}
              onClick={() => {
                setCategory(category === item ? "" : item);
                setCurrentPage(1);
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="filters-row">
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Types</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Status</option>

            <option value="active">Active</option>

            <option value="claimed">Claimed</option>

            <option value="returned">Returned</option>
          </select>

          <input
            type="text"
            placeholder=" Location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setCurrentPage(1);
            }}
          />

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setCurrentPage(1);
            }}
          >
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
              setStatus("");
              setLocation("");
              setSort("newest");
              setCurrentPage(1);
            }}
          >
            Clear Filters
          </button>
        </div>
        <div className="active-filters">
          {category && (
            <button className="filter-pill" onClick={() => setCategory("")}>
              {category} ✕
            </button>
          )}

          {type && (
            <button className="filter-pill" onClick={() => setType("")}>
              {type} ✕
            </button>
          )}

          {status && (
            <button className="filter-pill" onClick={() => setStatus("")}>
              {status} ✕
            </button>
          )}

          {location && (
            <button className="filter-pill" onClick={() => setLocation("")}>
              {location} ✕
            </button>
          )}
        </div>
      </section>

      <section className="items-section">
        <div className="section-heading">
          <div>
            <h2>Recently Added Items</h2>

            <p className="result-count">
              {totalItems} item{totalItems !== 1 ? "s" : ""} found
            </p>
          </div>

          <Link to="/dashboard">View All</Link>
        </div>

        <div className="items-list">
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
              <img src={EmptySearch} alt="No results" className="empty-image" />

              <h3>No matching items found</h3>

              <p>
                We couldn't find any items matching your search. Try adjusting
                your filters or search with different keywords.
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

        


        {/* PAGINATION START */}

        {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              ←
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
              →
            </button>
          </div>
        )}

        {/* PAGINATION END */}
      </section>
    </>
  );
}

export default Home;
