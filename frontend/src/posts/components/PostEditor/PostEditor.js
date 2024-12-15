import React, {useEffect, useState} from 'react';
import './PostEditor.css';
import Modal from "../../../shared/components/Modal/Modal";
import Post from "../Post/Post";
import {createPost, getAllPosts} from "../../Hooks/Post_hook";
import {useProfile} from "../../../contexts/Profile_context";

const PostEditor = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]); // Array to store posts

  const {user} = useProfile()

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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

  const handlePost = async () => {
    if (postText.trim() === '') return; // Ignore empty posts
    const newPost = {
      content: postText,
      timestamp: `${Date.now().toString().slice(0,10)} ${Date.now().toString().slice(12,16)}` // Add a timestamp
    };
    await createPost(postText, user.userId);
    fetchPosts();
    setPostText(''); // Clear input
    setModalOpen(false); // Close Modal
  };

  console.log(posts);
  console.log(posts[0]);

  return (
      <div className="outside-container">
        <div className="post-editor-container">
          <div className="post-editor-header">
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
          {posts.map((newPost, index) => (
              <Post
                  key={index}
                  content={newPost.content}
                  timestamp={newPost.createdAt}
                  username={newPost.userId.username}
                  deletable={newPost.userId._id === user?.userId}
                  postId={newPost._id}
                  onFetchPost={fetchPosts}
                  userId={newPost.userId._id} />
          ))}
        </div>
      </div>
  );
};

export default PostEditor;