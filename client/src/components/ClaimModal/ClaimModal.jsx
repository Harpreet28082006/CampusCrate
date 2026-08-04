import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./ClaimModal.css";

function ClaimModal({ itemId, onClose }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const claimMessage = message.trim();

if (!claimMessage) {
  return toast.error("Please enter your message.");
}

if (claimMessage.length < 20) {
  return toast.error(
    "Please provide at least 20 characters explaining why this item belongs to you."
  );
}

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.post(
        "https://campuscrate-1vil.onrender.com/api/claims",
        {
          itemId,
          message: claimMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Claim submitted successfully");
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="claim-overlay">
      <div className="claim-modal">
        <h2>Claim this Item</h2>

        <p>
          Tell the owner why this item belongs to you.
        </p>

        <form onSubmit={handleSubmit}>
          <textarea
            rows="6"
            placeholder="Example: I know the wallpaper, password hint, charger sticker, etc."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="claim-buttons">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Claim"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClaimModal;