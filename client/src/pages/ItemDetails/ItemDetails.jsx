import ReportModal from "../../components/ReportModal/ReportModal";
import QRModal from "../../components/QRModal/QRModal";
import ClaimModal from "../../components/ClaimModal/ClaimModal";
import ContactOwnerModal from "../../components/ContactOwnerModal/ContactOwnerModal";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./ItemDetails.css";

function ItemDetails() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showClaimModal, setShowClaimModal] = useState(false);

  const [claimMessage, setClaimMessage] = useState("");
  const [claimLoading, setClaimLoading] = useState(false);

  const [showContactModal, setShowContactModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

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

  const handleClaim = async () => {
    if (!claimMessage.trim()) {
      alert("Please enter your claim message.");
      return;
    }

    try {
      setClaimLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        "http://localhost:5000/api/claims",
        {
          itemId: item._id,
          message: claimMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(error.response?.data?.message || "Failed to submit report.");

      setClaimMessage("");

      fetchItem();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to submit claim");
    } finally {
      setClaimLoading(false);
    }
  };

  const handleReturnItem = async () => {
    const confirmReturn = window.confirm("Mark this item as returned?");

    if (!confirmReturn) return;

    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.patch(
        `http://localhost:5000/api/items/${item._id}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(data.message);

      fetchItem();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <section>
        <h2>Loading...</h2>
      </section>
    );
  }

  if (!item) {
    return (
      <section>
        <h2>Item not found.</h2>

        <Link to="/" className="back-btn">
          ← Back
        </Link>
      </section>
    );
  }

  return (
    <section className="item-details-page">
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

          {item.status !== "returned" ? (
            <button
              className="claim-btn"
              onClick={() => setShowClaimModal(true)}
            >
              Claim Item
            </button>
          ) : (
            <div className="returned-message">
              <h3>
                This item has already been returned and is no longer available
                for claims.
              </h3>
            </div>
          )}

          <div className="details-actions">
            <button
              className="contact-btn"
              onClick={() => setShowContactModal(true)}
            >
              Contact Owner
            </button>

            <button
              className="report-btn"
              onClick={() => setShowReportModal(true)}
            >
              Report Item
            </button>

            <button className="qr-btn" onClick={() => setShowQRModal(true)}>
              View QR
            </button>

            {item.status !== "returned" && (
              <button className="return-btn" onClick={handleReturnItem}>
                Mark Returned
              </button>
            )}
          </div>

          {showClaimModal && (
            <ClaimModal
              itemId={item._id}
              claimMessage={claimMessage}
              setClaimMessage={setClaimMessage}
              handleClaim={handleClaim}
              claimLoading={claimLoading}
              onClose={() => setShowClaimModal(false)}
            />
          )}
          {showContactModal && (
            <ContactOwnerModal
              owner={item.postedBy}
              closeModal={() => setShowContactModal(false)}
            />
          )}
          {showReportModal && (
            <ReportModal
              itemId={item._id}
              onClose={() => setShowReportModal(false)}
            />
          )}

          {showQRModal && (
            <QRModal item={item} onClose={() => setShowQRModal(false)} />
          )}
        </div>
      </div>
    </section>
  );
}

export default ItemDetails;
