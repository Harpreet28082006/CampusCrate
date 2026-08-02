import { useRef } from "react";
import { toPng } from "html-to-image";
import "./QRModal.css";

function QRModal({ item, onClose }) {
  const qrRef = useRef();

  const downloadQR = async () => {
    try {
      const dataUrl = await toPng(qrRef.current);

      const link = document.createElement("a");
      link.download = `${item.title}-QR.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="qr-overlay" onClick={onClose}>
      <div
        className="qr-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="qr-close"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="qr-header">

          <span className="verified-badge">
            ✔ CampusCrate Verified
          </span>

          <h2>Item QR Code</h2>

          <p>
            Scan this QR code to verify this item.
          </p>

        </div>

        <div
          className="qr-card"
          ref={qrRef}
        >
          <img
            src={item.qrCode}
            alt="QR Code"
          />
        </div>

        <h3>{item.title}</h3>

        <span className={`type-badge ${item.type}`}>
          {item.type.toUpperCase()}
        </span>

        <button
          className="download-btn"
          onClick={downloadQR}
        >
          ⬇ Download QR
        </button>
      </div>
    </div>
  );
}

export default QRModal;