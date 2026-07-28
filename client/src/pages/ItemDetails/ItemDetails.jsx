import { Link, useParams } from "react-router-dom";
import "./ItemDetails.css";

function ItemDetails() {
  const { id } = useParams();

  return (
    <section className="item-details">

      <Link to="/" className="back-btn">
        ← Back
      </Link>

      <div className="details-card">

        <img
          src="https://placehold.co/500x350?text=Item+Image"
          alt="Item"
        />

        <div className="details-content">

          <h1>Black Wallet</h1>

          <p><strong>Item ID:</strong> {id}</p>

          <p><strong>Category:</strong> Wallet</p>

          <p><strong>Location:</strong> Library Block</p>

          <p><strong>Date:</strong> 26 July 2026</p>

          <p><strong>Status:</strong> Lost</p>

          <p>
            <strong>Description:</strong>
            <br />
            Black leather wallet containing college ID card and a few important documents.
          </p>

          <button>Contact Owner</button>

        </div>

      </div>

    </section>
  );
}

export default ItemDetails;