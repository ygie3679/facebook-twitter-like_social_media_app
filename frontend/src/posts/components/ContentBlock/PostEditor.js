// PostEditorWithModal.js
import React, { useState } from 'react';
import './PostEditor.css';

const PostEditor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postText, setPostText] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
    console.log("Modal openned!")
  }
  const closeModal = () => setIsModalOpen(false);

  const handleTextChange = (e) => setPostText(e.target.value);

  const handlePost = () => {
    console.log('Post:', postText);
    closeModal();
    setPostText(''); // Reset text after posting
  };

  return (
      <div className="page-container">
        <div className="left-column"></div>
        <div className="middle-column">
          <div className="post-editor-container">
            <div className="post-editor-header">
              <div className="profile-pic"></div>
              <textarea
                  placeholder="What's on your mind?"
                  onClick={openModal}
                  readOnly
                  className="post-editor-textarea"
              />
            </div>

            <div className="post-editor-actions">
              <button className="action-button">🎥 Live video</button>
              <button className="action-button">📷 Photo/video</button>
              <button className="action-button">😊 Feeling/activity</button>
            </div>
          </div>
        </div>
        <div className="right-column"></div>

        {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <textarea
                    placeholder="What's on your mind?"
                    onChange={handleTextChange}
                    className="modal-textarea"
                />
                <div className='post-editor-actions'>
                  <button className="action-button">🎥 Upload video</button>
                  <button className="action-button">📷 Upload Photo</button>
                  <button className="action-button">😊 Feeling/activity</button>
                </div>
                <button className="modal-close" onClick={closeModal}>
                  Close
                </button>
                <button className="modal-post" onClick={handlePost}>
                  Post your status update
                </button>
              </div>
            </div>
        )}
      </div>
  );
};

export default PostEditor;