import React, { useState } from "react";
import "./NavBar.css";
import { useNavigate } from "react-router";

const Navbar = (props) => {
  const { sessionUser } = props
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem("auth-token");
    navigate('/login')
  };

  return (
    <div>
      <nav className="navbar">
        <ul className="link-menu">
          <li>
            <a href="/#">Settings</a>
          </li>
          <li>
            <a href="https://github.com/andshevliakov/cloudide/blob/master/README.md">
              Help
            </a>
          </li>
        </ul>
        <div
          className="user-navbar"
        >
          <img
            className="user-avatar"
            src="https://via.placeholder.com/30"
            alt="User avatar"
          />
          <div
            onMouseEnter={() => setIsUserMenuVisible(true)}
            onMouseLeave={() => setIsUserMenuVisible(false)}
          >
            <span className="user-name">{sessionUser.username}</span>
            <div className="user-menu" style={{ display: isUserMenuVisible ? "block" : "none" }}>
              <div className="user-list">
                <ul>
                  <li>Profile</li>
                  <li>Settings</li>
                  <li onClick={handleLogoutClick}>Logout</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav >
    </div >
  );
};

export default Navbar;
