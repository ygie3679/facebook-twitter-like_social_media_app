import React from "react";
import "./UserModal.css";

const UserModal = ({ modalOpen, onClose, children }) => {
  if (!modalOpen) return null;

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={handleContentClick}>
          <button className="modal-close-button" onClick={onClose}>
            ×
          </button>
          {children}
        </div>
      </div>
  );
};

export default UserModal;