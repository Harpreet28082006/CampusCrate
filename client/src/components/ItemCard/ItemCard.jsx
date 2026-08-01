import { Link } from "react-router-dom";
import "./ItemCard.css";

function ItemCard({
  id,
  title,
  location,
  date,
  photoUrl,
  type,
  category,
}) {
  return (
    <div className="item-card">

      <div className="item-image-wrapper">

        {photoUrl ? (
          <img
            src={photoUrl}
            alt={title}
            className="item-image"
          />
        ) : (
          <div className="item-placeholder">
            📦
          </div>
        )}

        <span className={`item-status ${type}`}>
          {type}
        </span>

      </div>

      <div className="item-content">

        <span className="item-category">
          {category}
        </span>

        <h3>{title}</h3>

        <div className="item-info">

          <span>📍 {location}</span>

          <span>📅 {date}</span>

        </div>

        <Link
          to={`/item/${id}`}
          className="item-link"
        >
          View Details →
        </Link>

      </div>

    </div>
  );
}

export default ItemCard;