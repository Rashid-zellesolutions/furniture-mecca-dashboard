// Header.js
import React, {useState} from 'react';
import './Header.css';
import { CiLogout } from "react-icons/ci";
import { useLocation, useNavigate } from 'react-router-dom';


function Header() {
  const location = useLocation()
  const navigate = useNavigate();
  const pageName = location.pathname;
  const lastName = pageName.split('/').pop();
  const removeDash = lastName.split('-').join(' ')
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const username = sessionStorage.getItem('username'); // Retrieve username from sessionStorage

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('username');
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };


  return (
    <header className="parentHeadClass">
      <div className="categoryClass">
        <div className="product">{removeDash}</div>
        <div className="authSection">
          <img src="/Notifier.png" alt="Notifier" className="notifierImage" />
          <img src="/Frame.png" alt="Frame" className="framerImage" />
          {/* <a href="https://myfurnituremecca.com" target="_blank" rel="noopener noreferrer" className="furnitureMeccaText">
            Furniture Mecca
          </a> */}
          {/* User dropdown */}
          <div className="userDropdown">
            <span onClick={toggleDropdown} className="username">
              {username}
            </span>
            
            {dropdownVisible && (
              <div className="dropdownMenu">
                <div className='HandleLogout' onClick={handleLogout}>
                <span>Logout</span>
                <CiLogout className='Logout-Btn'/>
                {/* Add more dropdown options here */}
                </div>
              </div>
            )}
            </div>
        </div>
      </div>
    </header>
  );
}

export default Header;