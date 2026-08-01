import { Link } from "react-router-dom";
import "./ItemCard.css";

import Button from "../Button/Button";

function ItemCard({
  id,
  title,
  location,
  date,
  photoUrl,
}) {
  return (
    <div className="item-card">

      {photoUrl ? (
        <img
          src={photoUrl}
          alt={title}
          className="item-image"
        />
      ) : (
        <div className="item-image placeholder-image">
          No Image Available
        </div>
      )}

      <div className="item-content">

        <h3>{title}</h3>

        <p className="item-location">
          📍 {location}
        </p>

        <p className="item-date">
          📅 {date}
        </p>

        <Link to={`/item/${id}`}>
          <Button text="View Details" />
        </Link>

      </div>

    </div>
  );
}

export default ItemCard;