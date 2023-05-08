import React from "react";
import Leftbar from "./LeftBar";
import Navbar from "./NavBar";
import ToolBar from "./ToolBar";
import ResultBar from "./ResultBar";

function Bars(props) {
  const { onRun, result, user, onLogout } = props;

  return (
    <React.Fragment>
      <Navbar user={user} onLogout={onLogout} />
      <Leftbar />
      <ToolBar onRun={onRun} />
      <ResultBar result={result} />
    </React.Fragment>
  );
}

export default Bars;
