import React from "react";
import "./Modal.css"

const Modal = ({modalOpen, onClose, onChange, children}) => {
  if (!modalOpen) return null;

  return (
      <div className='modal-overlay'>
        <div className='modal-content'>
          <button className="modal-close-button" onClick={onClose}>
            x
          </button>
          <textarea
              placeholder="What's on your mind?"
              className="modal-textarea"
              onChange={onChange}
          />
          <div className='modal-actions'>
            <button className="action-button">🎥 Video</button>
            <button className="action-button">📷 Photo</button>
            <button className="action-button">😊 Feeling/activity</button>
            <button className="action-button">📍 Location</button>
          </div>
          {children}
        </div>
      </div>
  );
}

export default Modal;

