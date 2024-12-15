import React, { useState, useEffect } from "react";
import UserModal from "../UserModal/UserModal";
import "./UserLogo.css";
import {useProfile} from "../../../contexts/Profile_context";
import { useNavigate } from 'react-router-dom';

const UserLogo = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {user, userSignin, checkLoggedIn, userSignup, logout} = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await checkLoggedIn();
      } catch {
        console.log("Not authenticated");
      }
    };
    fetchProfile();
  }, []);

  const handleSignin = async () => {
    const res = await userSignin(email, password);

    if (res) {
      setModalOpen(false);
      window.location.reload();
    }
  };

  const handleSignup = async () => {
    const res = await userSignup(email, username, password);
    if (res) {
      setModalOpen(false);
      window.location.reload();
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate(`/`);
  };

  const goToAccount = () => {
    const userId = user.userId;
    navigate(`/user/${userId}`);
  };

  return (
      <div className="user-logo-container">
        {user ? (
            <div className="user-logo">
              <img
                  src={user?.avatar || "https://img.freepik.com/premium-vector/flat-cute-santa-claus-christmas-avatar-icon-vector-isolated-white-background_1035836-31.jpg?w=996"}
                  alt="Avatar"
                  className="user-logo-avatar"
                  onClick={goToAccount}
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
                    <div className="userModal">
                      <h2>Sign Up</h2>
                      <input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                      />
                      <input
                          placeholder="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
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
                    <div className="userModal">
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