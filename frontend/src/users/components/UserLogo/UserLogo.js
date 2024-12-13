import React, { useState, useEffect } from "react";
import { signup, signin, account, logout } from "/Users/gina/Documents/Study/NEU/CSA/Term1/5610WebDev/Assignments/Projects/project3/facebook-twitter-like_social_media_app/frontend/src/users/pages/Auth.js";
import UserModal from "../UserModal/UserModal";
import "./UserLogo.css";

const UserLogo = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await account();
        setUser(data.user);
        setIsAuthenticated(true);
      } catch {
        console.log("Not authenticated");
      }
    };
    fetchProfile();
  }, []);

  const handleSignin = async () => {
    try {
      const data = await signin(email, password);
      setUser(data);
      setIsAuthenticated(true);
      setModalOpen(false);
    } catch (error) {
      console.error("Error during signin:", error);
    }
  };

  const handleSignup = async () => {
    try {
      const data = await signup(email, password);
      setUser(data);
      setIsAuthenticated(true);
      setModalOpen(false);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const goToAccount = () => {
    window.location.href = "/account";
  };

  return (
      <div className="user-logo-container">
        {isAuthenticated ? (
            <div className="user-logo" onClick={goToAccount}>
              <img
                  src={user?.avatar || "/default-avatar.png"}
                  alt="User Avatar"
                  className="user-logo-avatar"
              />
              <button onClick={handleLogout}>Logout</button>
            </div>
        ) : (
            <div>
              <button onClick={() => { setModalOpen(true); setModalType("signup"); }}>
                Sign Up
              </button>
              <button onClick={() => { setModalOpen(true); setModalType("signin"); }}>
                Sign In
              </button>

              <UserModal modalOpen={modalOpen} onClose={() => setModalOpen(false)}>
                {modalType === "signup" ? (
                    <div>
                      <h2>Sign Up</h2>
                      <input
                          type="text"
                          placeholder="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                      />
                      <input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                      />
                      <input
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                      />
                      <button onClick={handleSignup}>Sign Up</button>
                    </div>
                ) : (
                    <div>
                      <h2>Sign In</h2>
                      <input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                      />
                      <input
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                      />
                      <button onClick={handleSignin}>Sign In</button>
                    </div>
                )}
              </UserModal>
            </div>
        )}
      </div>
  );
};

export default UserLogo;