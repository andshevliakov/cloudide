import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Cell from './cell/Cell';
import Bars from './bars/Bars';

function App() {
  // const onChange = React.useCallback((value, viewUpdate) => {
  //   console.log('value:', value);
  // }, []);
  return (
    <React.Fragment>
    <Bars />
    <Cell />
    </React.Fragment>
  );
}

export default App;
