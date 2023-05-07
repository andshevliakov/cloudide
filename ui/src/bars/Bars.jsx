import React from "react";
import Leftbar from "./LeftBar";
import Navbar from "./NavBar";
import ToolBar from "./ToolBar";
import ResultBar from "./ResultBar";

function Bars(props) {
  const { onRun, result } = props;

  return (
    <React.Fragment>
      <Navbar />
      <Leftbar />
      <ToolBar onRun={onRun} />
      <ResultBar result={result} />
    </React.Fragment>
  );
}

export default Bars;
