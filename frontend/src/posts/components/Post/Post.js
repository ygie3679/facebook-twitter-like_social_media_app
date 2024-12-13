import React from "react";
import './Post.css';

const Post = ({ content, timestamp }) => {
  return (
      <div className="post">
        <div className="post-header">
          <img
              src="https://via.placeholder.com/40" // Placeholder avatar
              alt="User avatar"
              className="post-avatar"
          />
          <div className="post-info">
            <span className="post-author">John Doe</span> {/* Replace with dynamic name if needed */}
            <span className="post-timestamp">
            {new Date(timestamp).toLocaleString()}
          </span>
          </div>
        </div>
        <div className="post-content">
          <p>{content}</p>
        </div>
        <div className="post-actions">
          <button>Like</button>
          <button>Comment</button>
          <button>Share</button>
        </div>
      </div>
  );
};

export default Post;