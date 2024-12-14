import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getPostsbyUserId} from "../../../posts/Hooks/Post_hook";
import {getUserById} from "../../hooks/Auth";
import Navbar from "../../../shared/components/Navbar/Navbar";
import "./AccountPage.css"
import Post from "../../../posts/components/Post/Post";

const AccountPage = () => {
  // const params = useParams();
  const userId = useParams().userId;
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
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
        // userId = req.params.uid;
        const userData = await getUserById(userId);
        setUser(userData);
      } catch (error){
        console.log("Get user by Id Failed");
        console.log("failed", userId);
        console.log(error.message);
      }
    };
    getUser(userId);
  }, []);

  return (
      <div>
      {user ?
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
              <div className="mid-column">
                <header className="header">
                  <h1>Status Updates</h1>
                  <div className="post-feed">
                    {userPosts.map((post, index) => (
                        <Post
                            key={index}
                            content={post.content}
                            timestamp={post.timestamp}
                            username={post.userId.username}
                            deletable={true}
                            postId={post._id}
                            onFetchPost={fetchPosts}
                            userId/>
                    ))}
                  </div>
                </header>
              </div>

              <div className="right-column">
                <header className="header">
                  <h1>User Information</h1>
                </header>

              </div>
            </div>
          </div>)
          : (<div>Not existed</div>)}
      </div>)
}

export default AccountPage;
