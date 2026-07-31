import "./ContactOwnerModal.css";

function ContactOwnerModal({ owner, closeModal }) {
  const copyEmail = () => {
    navigator.clipboard.writeText(owner.email);
    alert("Email copied!");
  };

  return (
    <div className="contact-modal-overlay">
      <div className="contact-modal">
        <button className="close-modal" onClick={closeModal}>
          ✕
        </button>

        {owner.profilePhoto ? (
          <img
            src={owner.profilePhoto}
            alt={owner.name}
            className="owner-photo"
          />
        ) : (
          <div className="owner-avatar">
            {owner.name.charAt(0).toUpperCase()}
          </div>
        )}

        <h2 className="owner-name">{owner.name}</h2>

        <p className="owner-college">
          {owner.college || "College not available"}
        </p>

        <div className="email-box">
          <div className="email-info">
            <span className="email-label">Email Address</span>

            <p>{owner.email}</p>
          </div>

          <button className="copy-btn" onClick={copyEmail}>
             Copy
          </button>
        </div>

        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${owner.email}`}
          target="_blank"
          rel="noopener noreferrer"
          className="gmail-btn"
        >
          Open Gmail
        </a>

        <div className="notice-card">
          <h4>🛡 Please be respectful</h4>

          <p>Contact the owner only regarding this lost or found item.</p>
        </div>
      </div>
    </div>
  );
}

export default ContactOwnerModal;
