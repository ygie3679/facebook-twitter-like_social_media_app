import React, {useState} from 'react';
import './Navbar.css';
import { FaFacebook, FaSearch, FaUserCircle,
        FaFacebookMessenger, FaHome, FaUserFriends } from 'react-icons/fa';
import { IoStorefrontOutline } from "react-icons/io5";

const Navbar = () => {
  const [isHomeActive, setIsHomeActive] = useState(false);
  const [isFriendsActive, setIsFriendsActive] = useState(false);
  const [isMarketActive, setIsMarketActive] = useState(false);

  const handleHomeClick = () => {
    setIsHomeActive(!isHomeActive);
    if (isFriendsActive) {
      setIsFriendsActive(!isFriendsActive);
    };
    if (isMarketActive) {
      setIsMarketActive(!isMarketActive);
    }
  };
  const handleFriendsClick = () => {
    setIsFriendsActive(!isFriendsActive);
    if (isHomeActive) {
      setIsHomeActive(!isHomeActive);
    };
    if (isMarketActive) {
      setIsMarketActive(!isMarketActive);
    }
  };
  const handleMarketClick = () => {
    setIsMarketActive(!isMarketActive);
    if (isFriendsActive) {
      setIsFriendsActive(!isFriendsActive);
    };
    if (isHomeActive) {
      setIsHomeActive(!isHomeActive);
    }
  };

  const NavIcon = ({ icon: Icon, isActive, onClick }) => (
      <Icon
          className={`mid-icon ${isActive ? 'active' : ''}`}
          onClick={onClick}
      />
  );

  return (
      <div className='navbar'>
        <div className='left-column'>
          <FaFacebook className="fb-logo icon"/>
          <FaSearch className='search icon'/>
        </div>

        <div className='mid-column'>
          <NavIcon icon={FaHome} isActive={isHomeActive} onClick={handleHomeClick} />
          <NavIcon icon={FaUserFriends} isActive={isFriendsActive} onClick={handleFriendsClick} />
          <NavIcon icon={IoStorefrontOutline} isActive={isMarketActive} onClick={handleMarketClick} />
        </div>

        <div className='right-column'>
          <FaFacebookMessenger className='messenger icon'/>
          <FaUserCircle className='account icon'/>
        </div>
      </div>
  );
}

export default Navbar;
