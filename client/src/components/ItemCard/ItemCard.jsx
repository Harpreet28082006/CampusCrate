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
    <Link
      to={`/item/${id}`}
      className="item-card"
    >
      <div className="card-image">

        {photoUrl ? (
          <img
            src={photoUrl}
            alt={title}
          />
        ) : (
          <div className="image-placeholder">
            📦
          </div>
        )}

      </div>

      <div className="card-content">

        <span className="card-category">
          {category}
        </span>

        <h3>
          {title}
        </h3>

        <div className="card-meta">

          <p>📍 {location}</p>

          <p>📅 {date}</p>

        </div>

      </div>

      <div className="card-right">

        <span
          className={`status ${type}`}
        >
          {type.toUpperCase()}
        </span>

        <span className="view-link">
          View →
        </span>

      </div>

    </Link>
  );
}

export default ItemCard;