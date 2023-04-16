import React from "react";
import Leftbar from "./LeftBar";
import Navbar from "./NavBar";
import ToolBar from "./ToolBar";

function Bars(props) {
  return (
    <React.Fragment>
      <Navbar />
      <Leftbar />
      <ToolBar onRun={props.onRun} />
    </React.Fragment>
  );
}

export default Bars;
