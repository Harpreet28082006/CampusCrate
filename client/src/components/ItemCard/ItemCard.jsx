import { Link } from "react-router-dom";
import "./ItemCard.css";

import Button from "../Button/Button";

function ItemCard({ id, title, location, date }) {
  return (
    <div className="item-card">
      <h3>{title}</h3>

      <p>{location}</p>

      <p> {date}</p>

      <Link to={`/item/${id}`}>
        <Button text="View Details" />
      </Link>
    </div>
  );
}

export default ItemCard;