import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";

import Button from "../../components/Button/Button";
import SearchBar from "../../components/SearchBar/SearchBar";
import ItemCard from "../../components/ItemCard/ItemCard";

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchItems() {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/items"
      );

      setItems(data.items);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <section className="hero">
        <h1>Campus Lost & Found System</h1>

        <p>
          A simple platform where students can report lost items, post found
          belongings, and help return valuable items to their rightful owners.
        </p>

        <div className="hero-buttons">
          <Link to="/post-lost">
            <Button text="Report Lost" />
          </Link>

          <Link to="/post-found">
            <Button text="Report Found" />
          </Link>
        </div>

        <SearchBar />
      </section>

      <section className="items-section">
        <div className="section-heading">
          <h2>Recently Added Items</h2>

          <Link to="/dashboard">
            View All
          </Link>
        </div>

        <div className="items-grid">
          {loading ? (
            <p>Loading...</p>
          ) : items.length > 0 ? (
            items.map((item) => (
              <ItemCard
                key={item._id}
                id={item._id}
                title={item.title}
                location={item.location}
                date={new Date(item.date).toLocaleDateString()}
                photoUrl={item.photoUrl}
              />
            ))
          ) : (
            <p>No items found.</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;