import React from "react";
import Leftbar from "./LeftBar";
import Navbar from "./NavBar";
import ToolBar from "./ToolBar";

function Bars(props) {
  const { user, onLogin, onLogout, onRun } = props;

  const handleLoginClick = () => {
    onLogin && onLogin();
  };

  const handleLogoutClick = () => {
    onLogout && onLogout();
  };

  return (
    <React.Fragment>
      <Navbar user={user} onLogin={handleLoginClick} onLogout={handleLogoutClick} />
      <Leftbar />
      <ToolBar onRun={onRun} />
    </React.Fragment>
  );
}

export default Bars;
