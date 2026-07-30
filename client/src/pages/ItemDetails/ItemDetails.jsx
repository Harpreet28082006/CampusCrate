import ClaimModal from "../../components/ClaimModal/ClaimModal";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./ItemDetails.css";

function ItemDetails() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showClaimModal, setShowClaimModal] = useState(false);

  async function fetchItem() {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/items/${id}`);

      setItem(data.item);
    } catch (error) {
      console.error("Error fetching item:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <section className="item-details">
        <h2>Loading...</h2>
      </section>
    );
  }

  if (!item) {
    return (
      <section className="item-details">
        <h2>Item not found.</h2>

        <Link to="/" className="back-btn">
          ← Back
        </Link>
      </section>
    );
  }

  return (
    <section className="item-details">
      <Link to="/" className="back-btn">
        ← Back
      </Link>

      <div className="details-card">
        <img
          src={item.photoUrl || "https://placehold.co/500x350?text=No+Image"}
          alt={item.title}
        />

        <div className="details-content">
          <h1>{item.title}</h1>

          <p>
            <strong>Category:</strong> {item.category}
          </p>

          <p>
            <strong>Type:</strong> {item.type}
          </p>

          <p>
            <strong>Location:</strong> {item.location}
          </p>

          <p>
            <strong>Date:</strong> {new Date(item.date).toLocaleDateString()}
          </p>

          <p>
            <strong>Status:</strong> {item.status}
          </p>

          <p>
            <strong>Description:</strong>
            <br />
            {item.description}
          </p>

          <div className="details-buttons">
            <button
              className="claim-btn"
              onClick={() => setShowClaimModal(true)}
            >
              Claim Item
            </button>

            <button className="contact-btn">Contact Owner</button>
          </div>
        </div>
      </div>

{showClaimModal && (
  <ClaimModal
    itemId={item._id}
    onClose={() => setShowClaimModal(false)}
  />
)}

    </section>
  );
}

export default ItemDetails;
