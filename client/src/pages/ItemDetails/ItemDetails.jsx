import ItemCard from "../../components/ItemCard/ItemCard";
import ReportModal from "../../components/ReportModal/ReportModal";
import QRModal from "../../components/QRModal/QRModal";
import ClaimModal from "../../components/ClaimModal/ClaimModal";
import ContactOwnerModal from "../../components/ContactOwnerModal/ContactOwnerModal";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [similarItems, setSimilarItems] = useState([]);

  async function fetchItem() {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/items/${id}`);

      setItem(data.item);
      fetchSimilarItems(data.item.category);
    } catch (error) {
      console.error("Error fetching item:", error);
    } finally {
      setLoading(false);
    }
  }

  const fetchSimilarItems = async (category) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/items?category=${category}&limit=4`,
      );

      const filtered = data.items.filter((i) => i._id !== id);

      setSimilarItems(filtered.slice(0, 4));
    } catch (error) {
      console.log(error);
    }
  };

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

      <div className="item-layout">
        {/* ================= LEFT ================= */}

        <div className="left-section">
          <div className="image-card">
            <div className="image-top">
              <div>
                <h1>{item.title}</h1>

                <p>
                  {item.category} • {item.type}
                </p>
              </div>

              <span className={`status-pill ${item.status}`}>
                {item.status}
              </span>
            </div>

            <img
              src={
                item.photoUrl || "https://placehold.co/800x600?text=No+Image"
              }
              alt={item.title}
              className="main-photo"
            />
          </div>

          {/* DESCRIPTION */}

          <div className="description-card">
            <h3>Description</h3>

            <p>{item.description}</p>
          </div>

          {/* DETAILS */}

          <div className="details-grid">
            <div>
              <small>Category</small>

              <h4>{item.category}</h4>
            </div>

            <div>
              <small>Location</small>

              <h4>{item.location}</h4>
            </div>

            <div>
              <small>Date</small>

              <h4>{new Date(item.date).toLocaleDateString()}</h4>
            </div>

            <div>
              <small>Status</small>

              <h4>{item.status}</h4>
            </div>
          </div>

          {/* TIMELINE */}

          <div className="timeline-card">
            <h3>Item Timeline</h3>

            <div className="timeline">
              <div className="timeline-item completed">
                <span></span>

                <div>
                  <h5>Posted</h5>

                  <p>{new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div
                className={`timeline-item ${
                  item.status !== "active" ? "completed" : ""
                }`}
              >
                <span></span>

                <div>
                  <h5>Claimed</h5>
                </div>
              </div>

              <div
                className={`timeline-item ${
                  item.status === "returned" ? "completed" : ""
                }`}
              >
                <span></span>

                <div>
                  <h5>Returned</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT ================= */}

        <div className="right-section">
          {/* OWNER */}

          <div className="owner-card">
            <h3>Owner Details</h3>

            <div className="owner-info">
              <div className="owner-avatar">
                {item.postedBy?.name?.charAt(0)}
              </div>

              <div>
                <h4>{item.postedBy?.name}</h4>

                <p>{item.postedBy?.email}</p>
              </div>
            </div>
          </div>

          {/* ACTIONS */}

          <div className="actions-card">
            <h3>Actions</h3>

            {item.status !== "returned" ? (
              <button
                className="primary-btn"
                onClick={() => setShowClaimModal(true)}
              >
                Claim Item
              </button>
            ) : (
              <button disabled className="disabled-btn">
                Already Returned
              </button>
            )}

            <button
              className="message-btn"
              onClick={() =>
                navigate("/messages", {
                  state: {
                    item,
                  },
                })
              }
            >
               Start Chat
            </button>

            <button onClick={() => setShowContactModal(true)}>
              Send Mail
            </button>

            <button onClick={() => setShowQRModal(true)}>Download QR</button>

            <button onClick={() => setShowReportModal(true)}>
              Report Item
            </button>

            {item.status !== "returned" && (
              <button className="return-btn" onClick={handleReturnItem}>
                Mark Returned
              </button>
            )}
          </div>

          {/* QR */}

          <div className="qr-card">
            <h3>QR Code</h3>

            <p>Scan to identify this item.</p>

            <img src={item.qrCode} alt="QR" className="qr-image" />

            <button onClick={() => setShowQRModal(true)}>Download QR</button>
          </div>
        </div>
      </div>

      <section className="similar-section">
        <div className="section-title">
          <h2>Similar Items</h2>

          <Link to="/">View More</Link>
        </div>

        <div className="similar-grid">
          {similarItems.map((item) => (
            <ItemCard
              key={item._id}
              id={item._id}
              title={item.title}
              location={item.location}
              date={new Date(item.date).toLocaleDateString()}
              photoUrl={item.photoUrl}
              type={item.type}
              category={item.category}
            />
          ))}
        </div>
      </section>

      {/* MODALS */}

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
    </section>
  );
}

export default ItemDetails;
