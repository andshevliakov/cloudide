import React from "react";
import "./NavBar.css";

const Navbar = () => {

  const handleLogoutClick = () => {
    localStorage.removeItem('auth-token');
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>
            <a href="/#">Settings</a>
          </li>
          <li>
            <a href="https://github.com/andshevliakov/cloudide/blob/master/README.md">
              Help
            </a>
          </li>
        </ul>
        <div className="user-navbar">
          <button onClick={handleLogoutClick}>
            logout(TODO)
          </button>
        </div>
      </nav>
    </div >
  );
};

export default Navbar;
