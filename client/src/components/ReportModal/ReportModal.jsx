import { toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import "./ReportModal.css";

function ReportModal({ itemId, onClose }) {
  const token = localStorage.getItem("token");

  const [reason, setReason] = useState("");

  const [loading, setLoading] = useState(false);

  const reasons = [
    "Fake Item",
    "Spam / Advertisement",
    "Duplicate Listing",
    "Inappropriate Content",
    "Wrong Category",
    "Suspicious Activity",
    "Other",
  ];

  async function submitReport() {
    if (!reason) {
      toast.error("Please select a reason.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        "https://campuscrate-1vil.onrender.com/api/reports",
        {
          itemId,
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);

setTimeout(() => {
    onClose();
},600);
    } catch (error) {
      toast.error(
  error.response?.data?.message || "Failed to submit report."
);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="report-overlay">

      <div className="report-modal">

        <h2>Report this Item</h2>

        <p>
Help us keep CampusCrate safe. Reports are reviewed by moderators before any action is taken.
</p>

        <div className="reason-list">

          {reasons.map((item) => (

            <label key={item}>

              <input
                type="radio"
                value={item}
                checked={reason === item}
                onChange={(e) => setReason(e.target.value)}
              />

              {item}

            </label>

          ))}

        </div>

        <div className="report-buttons">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="submit-btn"
            onClick={submitReport}
            disabled={loading}
          >
            {loading ? "Submitting Report..." : "Submit Report"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default ReportModal;