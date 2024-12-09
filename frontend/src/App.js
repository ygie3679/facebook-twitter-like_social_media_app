import React, {useState} from 'react';
import './App.css';
import { FaFacebook, FaSearch, FaUserCircle,
        FaFacebookMessenger, FaHome, FaUserFriends } from 'react-icons/fa';
import { IoStorefrontOutline } from "react-icons/io5";

const App = () => {
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

  return (
      <div className='primary-container'>
        <div className='navbar'>
          <div className='left-column'>
            <FaFacebook className="fb-logo icon"/>
            <FaSearch className='search icon'/>
          </div>

          <div className='mid-column'>
            <FaHome
                className={`home mid-icon ${isHomeActive ? 'active' : ''}`}
                onClick={handleHomeClick}/>
            <FaUserFriends className={`friends mid-icon ${isFriendsActive ? 'active' : ''}`}
                           onClick={handleFriendsClick}/>
            <IoStorefrontOutline className={`marketplace mid-icon ${isMarketActive ? 'active' : ''}`}
                                 onClick={handleMarketClick}/>
          </div>

          <div className='right-column'>
            <FaFacebookMessenger className='messenger icon'/>
            <FaUserCircle className='account icon'/>
          </div>
        </div>
      </div>
  );
}

export default App;
