import { useState } from "react";
import { Link } from "react-router-dom";
import ReportModal from "../ReportModal/ReportModal";
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
  const [showReportModal, setShowReportModal] = useState(false);

  return (
    <>
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

          <div className="item-actions">
            <Link
              to={`/item/${id}`}
              className="item-link"
            >
              View Details →
            </Link>

            <button
              className="report-card-btn"
              onClick={() => setShowReportModal(true)}
            >
               Report
            </button>
          </div>
        </div>
      </div>

      {showReportModal && (
        <ReportModal
          itemId={id}
          onClose={() => setShowReportModal(false)}
        />
      )}
    </>
  );
}

export default ItemCard;