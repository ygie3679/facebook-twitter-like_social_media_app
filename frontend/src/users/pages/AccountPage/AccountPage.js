import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getPostsbyUserId} from "../../../posts/Hooks/Post_hook";
import {getUserById, putUserDescription} from "../../hooks/Auth";
import Navbar from "../../../shared/components/Navbar/Navbar";
import "./AccountPage.css"
import Post from "../../../posts/components/Post/Post";
import {useProfile} from "../../../contexts/Profile_context";

const AccountPage = () => {
  // const params = useParams();
  const {checkLoggedIn} = useProfile();
  const userId = useParams().userId;
  const [accountUser, setAccountUser] = useState(null);
  const [logUser, setLogUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isEditDescription, setIsEditDescription] = useState(false);
  const [editDescription, setEditDescription] = useState();

  const fetchPosts = async () => {
    try {
      const userPosts = await getPostsbyUserId(userId);
      setUserPosts(userPosts);
      console.log(userPosts);
    } catch {
      console.log("Get your posts failed");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await checkLoggedIn();
        setLogUser(data.userId);
      } catch (error) {
        console.log(error.message);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await getUserById(userId);
        setAccountUser(userData);
        setEditDescription(userData.description);
      } catch (error) {
        console.log("Get user by Id Failed");
        console.log("failed", userId);
        console.log(error.message);
      }
    };
    getUser();
  }, []);

  const handleEditDescription = () => {
    setIsEditDescription(true);
  };
  const handleCancelDescription = () => {
    setIsEditDescription(false);
  };
  const handleSaveDescription = async () => {
    await putUserDescription(editDescription, userId);
    setIsEditDescription(false);
    window.location.reload();
  };
  const handleDescriptionChange = async (e) => {
    setEditDescription(e.target.value);
  };
  return (
      <div>
        {accountUser ?
            (<div className="page-container">
              <div className="out-container">
                <Navbar></Navbar>
              </div>
              <div className="column-container">
                <div className="left-column">
                  <header className="header">
                    <h1>Settings & privacy</h1>
                    <input type="text" className="search-bar"
                           placeholder="Find the setting you need"/>
                  </header>

                  <div className="accounts-center">
                    <div className="box">
                      <h3>Accounts Center</h3>
                      <ul>
                        <li>Personal details</li>
                        <li>Password and security</li>
                        <li>Ad preferences</li>
                        <li>Verification</li>
                      </ul>
                      <a href="#">See more in Accounts Center</a>
                    </div>
                  </div>
                </div>
                <div className="mid-col-user">
                  <header className="user-header">
                    <h1>Status Updates</h1>
                  </header>
                  {userPosts.length !== 0 ? (<div className="post-feed-user">
                        {userPosts.map((post, index) => (
                            <Post
                                key={index}
                                content={post.content}
                                timestamp={post.createdAt}
                                username={post.userId.username}
                                deletable={post.userId === accountUser?.userId}
                                postId={post._id}
                                onFetchPost={fetchPosts}
                                userId/>
                        ))}
                      </div>) :
                      (<div className="empty-bg">No status updates yet</div>)}
                </div>

                <div className="right-column">
                  <header className="header">
                    <h1>User Information</h1>
                    <div className="user-info">
                      <div className="box">
                        <h2>Username: {accountUser.username}</h2>
                        <h2>Joined at: {accountUser.createdAt?.slice(0,
                            10)}</h2>
                      </div>
                      <div className="box">
                        {isEditDescription ? (
                            <div>
                              <div>
                                <label
                                    htmlFor="description-input">Description:</label>
                                <input
                                    type="text"
                                    id="description-input"
                                    value={editDescription}
                                    onInput={handleDescriptionChange}
                                />
                              </div>
                              <button className="des-button"
                                      onClick={handleSaveDescription}>Save
                              </button>
                              <button className="des-button"
                                      onClick={handleCancelDescription}>Cancel
                              </button>
                            </div>
                        ) : (
                            <div>
                              <div>Description: {accountUser.description}</div>
                              {logUser === userId ? (
                                  <div>
                                    <button className="edit-button"
                                            onClick={handleEditDescription}>Edit
                                    </button>
                                  </div>
                              ) : (<div/>)}
                            </div>
                        )}
                      </div>
                    </div>

                  </header>

                </div>
              </div>
            </div>)
            : (<div>Not existed</div>)}
      </div>)
}

export default AccountPage;
