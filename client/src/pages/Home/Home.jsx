import { Link } from "react-router-dom";
import "./Home.css";

import Button from "../../components/Button/Button";
import SearchBar from "../../components/SearchBar/SearchBar";
import ItemCard from "../../components/ItemCard/ItemCard";

function Home() {
  const items = [
    {
      id: 1,
      title: "Black Wallet",
      location: "Library Block",
      date: "26 July 2026",
    },
    {
      id: 2,
      title: "College ID Card",
      location: "Cafeteria",
      date: "25 July 2026",
    },
    {
      id: 3,
      title: "Power Bank",
      location: "Parking Area",
      date: "24 July 2026",
    },
  ];

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
          {items.map((item) => (
            <ItemCard
              key={item.id}
              id={item.id}
              title={item.title}
              location={item.location}
              date={item.date}
            />
          ))}
        </div>

      </section>
    </>
  );
}

export default Home;