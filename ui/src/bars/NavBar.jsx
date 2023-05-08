import React from "react";
import "./NavBar.css";

const Navbar = (props) => {
  const { user, onLogout } = props;

  const handleLogoutClick = () => {
    onLogout && onLogout();
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>
            <a href="#">Settings</a>
          </li>
          <li>
            <a href="#">Help</a>
          </li>
        </ul>
        <div className="user-navbar">
          <button onClick={onLogout}>logout({user})</button>
        </div>
      </nav>
    </div >
  );
};

export default Navbar;
