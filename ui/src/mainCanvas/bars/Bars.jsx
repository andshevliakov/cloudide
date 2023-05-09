import React from "react";
import Leftbar from "./LeftBar";
import Navbar from "./NavBar";
import ToolBar from "./ToolBar";
import ResultBar from "./ResultBar";

const Bars = (props) => {
  const { handleRun, runResult, user } = props;

  return (
    <React.Fragment>
      <Navbar user={user} />
      <Leftbar />
      <ToolBar handleRun={handleRun} />
      <ResultBar result={runResult} />
    </React.Fragment>
  );
}

export default Bars;