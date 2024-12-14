import React, {useState} from 'react';
import './Navbar.css';
import {
  FaFacebook, FaSearch, FaUserCircle,
  FaFacebookMessenger, FaHome, FaUserFriends
} from 'react-icons/fa';
import {IoStorefrontOutline} from "react-icons/io5";
import UserLogo from "../../../users/components/UserLogo/UserLogo";
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isHomeActive, setIsHomeActive] = useState(false);
  const [isFriendsActive, setIsFriendsActive] = useState(false);
  const [isMarketActive, setIsMarketActive] = useState(false);

  const handleHomeClick = () => {
    setIsHomeActive(!isHomeActive);
    if (isFriendsActive) {
      setIsFriendsActive(!isFriendsActive);
    }
    ;
    if (isMarketActive) {
      setIsMarketActive(!isMarketActive);
    }
    navigate('/');
    console.log("navigated to home");
  };
  const handleFriendsClick = () => {
    setIsFriendsActive(!isFriendsActive);
    if (isHomeActive) {
      setIsHomeActive(!isHomeActive);
    }
    ;
    if (isMarketActive) {
      setIsMarketActive(!isMarketActive);
    }
  };
  const handleMarketClick = () => {
    setIsMarketActive(!isMarketActive);
    if (isFriendsActive) {
      setIsFriendsActive(!isFriendsActive);
    }
    ;
    if (isHomeActive) {
      setIsHomeActive(!isHomeActive);
    }
  };

  const NavIcon = ({icon: Icon, isActive, onClick}) => (
      <Icon
          className={`mid-icon ${isActive ? 'active' : ''}`}
          onClick={onClick}
      />
  );

  return (
      <div className='navbar'>
        <div className='left-part'>
          <FaFacebook className="fb-logo icon"/>
          <FaSearch className='search icon'/>
        </div>

        <div className='mid-part'>
          <NavIcon icon={FaHome} isActive={isHomeActive}
                   onClick={handleHomeClick}
          />
          <NavIcon icon={FaUserFriends} isActive={isFriendsActive}
                   onClick={handleFriendsClick}/>
          <NavIcon icon={IoStorefrontOutline} isActive={isMarketActive}
                   onClick={handleMarketClick}/>
        </div>

        <div className='right-part'>
          <FaFacebookMessenger className='messenger icon'/>
          <UserLogo className='account icon'/>
        </div>

        <div className="dropdown">
          <button className="hamburger-menu" id="hamburger-menu">☰</button>
          <div className="dropdown-menu" id="dropdown-menu">
            <a href="/search">Search</a>
            <a href="/feed">Feed</a>
            <a href="/messenger">Messenger</a>
            <a href="/account">Account</a>
          </div>
        </div>
      </div>
  );
}

export default Navbar;
