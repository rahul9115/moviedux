import React, { useEffect, useState, useRef } from 'react';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { PiSignOutBold } from 'react-icons/pi';
import { MdAdminPanelSettings, MdHome } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

import './NavBar.css';

const NavBar = () => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [userName, setUserName] = useState('User');
  const [initials, setInitials] = useState();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const account = accounts[0] || {};

  useEffect(() => {
    const accounts = instance.getAllAccounts();
    if (accounts.length > 0) {
      instance.setActiveAccount(accounts[0]);
      const name = accounts[0].name;
      setUserName(name);
      setInitials(getInitials(name));
    }
  }, [instance, isAuthenticated]);

  const handleLogout = () => {
    instance.logoutPopup().catch(error => console.log(error));
  };

  const getInitials = (name) => {
    const names = name.split(' ');
    const initials = names.map(n => n[0]).join('');
    return initials.slice(0, 2).toUpperCase();
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const navigateHome = () => {
    navigate('/');
  };

  const navigateAdmin = () => {
    navigate('/admin');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="/Penn-State-Logo.png" alt="Penn State Logo" className="navbar-logo" />
        <div className="navbar-content">
          <h1>Penn State </h1>
        </div>
      </div>
    
      {/* <div className="navbar-buttons">
        <button>Sign In</button>

      </div> */}
      {isAuthenticated && (
        <div className="navbar-right">
          <div className="navbar-controls"></div>
          <div className="navbar-user">
            <div className="profile" onClick={toggleDropdown} ref={dropdownRef}>
              <div className="profile-circle">{initials}</div>
              {showDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-item" onClick={navigateHome}>
                    <MdHome size={"1.2rem"} style={{ marginRight: ".7rem" }} />
                    Home
                  </div>
                  <div className="dropdown-item" onClick={navigateAdmin}>
                    <MdAdminPanelSettings size={"1.2rem"} style={{ marginRight: ".7rem" }} />
                    Admin
                  </div>
                  <div className="dropdown-item" onClick={handleLogout}>
                    <PiSignOutBold size={"1.5rem"} style={{ marginRight: ".7rem" }} />
                    Log out
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar; 