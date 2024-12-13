import React, { useState } from 'react';
import './PostEditor.css';
import Modal from "../../../shared/components/Modal/Modal";
import Post from "../Post/Post";

const PostEditor = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]); // Array to store posts
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleInputChange = (e) => {
    setPostText(e.target.value);
  };

  const handlePost = () => {
    if (postText.trim() === '') return; // Ignore empty posts
    const newPost = {
      content: postText,
      timestamp: Date.now(), // Add a timestamp
    };
    setPosts([newPost, ...posts]); // Add new post at the top of the array
    setPostText(''); // Clear input
    setModalOpen(false); // Close Modal
    // return posts;
    console.log("now the posts are: ", posts);
  };

  return (
      <div className="outside-container">
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

          <Modal
              modalOpen={isModalOpen}
              onClose={closeModal}
              onChange={handleInputChange}>
            <button
                className='modal-post-button'
                onClick={handlePost}>Post your status update</button>
          </Modal>
        </div>

        {/* Display posts */}
        <div className="post-feed">
          {posts.map((post, index) => (
              <Post key={index} content={post.content} timestamp={post.timestamp} />
          ))}
        </div>
      </div>
  );
};

export default PostEditor;