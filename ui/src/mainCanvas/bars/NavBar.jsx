import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { useNavigate } from "react-router";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import TokenManager from "../../api/tokenManager/tokenManager";
import UserManager from "../../api/userManager/userManager";

const tokenManager = new TokenManager();
const userManager = new UserManager();

const Navbar = (props) => {
  const { sessionUser, updateUser } = props
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [newName, setNewName] = useState('');
  const [newSurname, setNewSurname] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user-code");
    navigate('/login');
  };

  useEffect(() => {
    setNewName(sessionUser.name);
    setNewSurname(sessionUser.surname);
  }, [sessionUser, isPopupOpen])

  useEffect(() => {
    verifyExistingToken();
  }, [])

  const verifyExistingToken = () => {
    if ('auth-token' in localStorage) {
      tokenManager.verifyToken().then((result) => {
        if (!result) {
          navigate('/login');
        }
      })
    } else {
      navigate('/login');
    }
  };

  const handleProfileClick = () => {
    setIsEditable(false);
    setIsPopupOpen(true);
  };

  const handleSaveChangesClick = async () => {
    await updateUser(newName, newSurname, sessionUser.username, newPassword);
    setIsEditable(false);
  };

  const handleEditButtonOnClick = () => {
    setIsEditable(!isEditable);
  };

  const handleConfigurationClick = async () => {
    const response = await userManager.verifyUserExecutorSpec();
    if (response.status === 200) {
      navigate('/spawner', { state: { env: response.data.executorSpec } });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  }

  const handleSurnameChange = (event) => {
    setNewSurname(event.target.value);
  }

  const isFormValid = () => {
    return (
      isEditable &&
      newName !== '' &&
      newSurname !== '' &&
      newPassword === confirmPassword
    );
  }

  return (
    <div>
      <nav className="navbar">
        <ul className="link-menu">
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
                  <li onClick={handleProfileClick}>Profile</li>
                  <li onClick={handleConfigurationClick}>Configuration</li>
                  <li onClick={handleLogoutClick}>Logout</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Popup open={isPopupOpen} onClose={() => setIsPopupOpen(false)} modal closeOnDocumentClick={false}>
        {(close) => (
          <div className="popup-content">
            <button className="popup-close" onClick={close}>
              <span className="popup-close-btn">&times;</span>
            </button>
            <div className="general-info">
              <img
                className="user-avatar-general"
                src="https://via.placeholder.com/30"
                alt="User avatar"
              />
              <div className="username-general">
                <h2>{sessionUser.username}</h2>
                <button className="edit-button" onClick={handleEditButtonOnClick}>
                  <span className="edit-icon"></span>
                </button>
              </div>
              <div className="profile-form">
                <div className="form-group">
                  <span>Name</span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Input Name"
                    value={newName}
                    onChange={handleNameChange}
                    disabled={!isEditable}
                    style={{ width: "80%" }}
                  />
                  <div className="form-group">
                    <span>Surname</span>
                    <input
                      type="text"
                      id="surname"
                      name="surname"
                      placeholder="Input Surname"
                      value={newSurname}
                      onChange={handleSurnameChange}
                      disabled={!isEditable}
                      style={{ width: "80%" }}
                    />
                  </div>
                  <div className="form-group">
                    <span>New Password</span>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      placeholder="Input new password"
                      value={newPassword}
                      onChange={handlePasswordChange}
                      disabled={!isEditable}
                      style={{ width: "80%" }}
                    />
                  </div>
                  <div className="form-group">
                    <span>Confirm Password</span>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Input confirmation password"
                      onChange={handleConfirmPasswordChange}
                      disabled={!isEditable}
                      style={{ width: "80%" }}
                    />
                  </div>
                </div>
                <div className="save-button-container">
                  <button type="submit"
                    disabled={!isFormValid()}
                    onClick={handleSaveChangesClick}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
        }
      </Popup >
    </div >
  );
};

export default Navbar;
