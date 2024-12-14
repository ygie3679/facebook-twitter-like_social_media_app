import React, {useEffect, useState} from "react";
import './Post.css';
import {deletePost, editPost, getAllPosts} from "../../Hooks/Post_hook";
import { useNavigate } from 'react-router-dom';
import UserModal from "../../../users/components/UserModal/UserModal";


const Post = ({ content, timestamp, username, deletable, postId, onFetchPost, userId }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]); // Array to store posts
  const [postText, setPostText] = useState("");
  const [isEditClicked, setEditClicked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleInputChange = (e) => {
    setPostText(e.target.value);
  };

  const fetchPosts = async () => {
    try {
      const posts = await getAllPosts();
      setPosts(posts);
    } catch {
      console.log("Get all posts failed");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  async function handleDelete() {
    await deletePost(postId);
    onFetchPost();
  }

  async function handleEdit() {
    setEditClicked(true);
    await handleInputChange;
    onFetchPost();
  }

  function handleUserNameClick() {
    navigate(`/user/${userId}`);
  }

  return (
      <div className="post">
        <div className="post-header">
          <img
              src="https://via.placeholder.com/40" // Placeholder avatar
              alt="User avatar"
              className="post-avatar"
          />
          <div className="post-info">
            <span className="post-author"
                  onClick={handleUserNameClick}>{username ? username : "John Doe"}</span>
            <span className="post-timestamp">
            {timestamp}
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
          {deletable ? <button onClick={handleEdit}>Edit</button> : ``}
          {deletable ? <button onClick={handleDelete}>Delete</button> : ``}
        </div>
        <UserModal modalOpen={modalOpen} onClose={() => setModalOpen(false)}>
            <div className='userModal'>
              <textarea placeholder={postText}>

              </textarea>
            </div>
        </UserModal>
      </div>
  );
};

export default Post;