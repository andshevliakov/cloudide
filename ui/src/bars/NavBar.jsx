import React from "react";
import "./NavBar.css";

const Navbar = (props) => {
  const { user, onLogin, onLogout } = props;

  const handleLoginClick = () => {
    onLogin && onLogin();
  };

  const handleLogoutClick = () => {
    onLogout && onLogout();
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>
            <a href="#">Files</a>
          </li>
          <li>
            <a href="#">Settings</a>
          </li>
          <li>
            <a href="#">Help</a>
          </li>
          <li>
            {user ? (
              <button onClick={handleLogoutClick}>Logout</button>
            ) : (
              <button onClick={handleLoginClick}>Login</button>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
