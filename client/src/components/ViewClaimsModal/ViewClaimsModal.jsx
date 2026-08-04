import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./ViewClaimsModal.css";

function ViewClaimsModal({ itemId, onClose }) {
  const token = localStorage.getItem("token");

  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchClaims() {
    try {
      const { data } = await axios.get(
        `https://campuscrate-1vil.onrender.com/api/claims/item/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setClaims(data.claims);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch claims.");
    } finally {
      setLoading(false);
    }
  }

  async function approveClaim(id) {
    try {
      await axios.put(
        `https://campuscrate-1vil.onrender.com/api/claims/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Claim approved");

      await fetchClaims();

      setTimeout(() => {
        onClose();
      }, 700);
    } catch (error) {
      toast.error(error.response?.data?.message || "Approval failed");
    }
  }

  async function rejectClaim(id) {
    try {
      await axios.put(
        `https://campuscrate-1vil.onrender.com/api/claims/reject/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Claim rejected");

      await fetchClaims();
    } catch (error) {
      toast.error(error.response?.data?.message || "Rejection failed");
    }
  }

  useEffect(() => {
    fetchClaims();
  }, []);

  return (
    <div className="claims-overlay">
      <div className="claims-modal">
        <div className="claims-header">
          <h2>Item Claims</h2>

          <button onClick={onClose}>✕</button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : claims.length === 0 ? (
          <div className="claims-empty">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              alt="No Claims"
            />

            <h3>No Claims Yet</h3>

            <p>No student has requested this item yet.</p>
          </div>
        ) : (
          claims.map((claim) => (
            <div className="claim-card" key={claim._id}>
              <h3>{claim.claimantId?.name}</h3>

              <p>{claim.claimantId?.email}</p>

              <div className="claim-message">
                <strong>Message</strong>

                <p>{claim.message}</p>
              </div>

              <div className="claim-status-row">
                <strong>Status:</strong>

                <span className={`claim-status ${claim.status}`}>
                  {claim.status}
                </span>
              </div>

              {claim.status === "pending" && (
                <div className="claim-buttons">
                  <button onClick={() => approveClaim(claim._id)}>
                    Approve
                  </button>

                  <button onClick={() => rejectClaim(claim._id)}>
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ViewClaimsModal;