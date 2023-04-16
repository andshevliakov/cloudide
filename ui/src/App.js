import React, { useRef, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Cell from './cell/Cell';
import Bars from './bars/Bars';

const executorUrl = process.env.EXECUTOR_URI || 'http://localhost:8000'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {code: ''}
  }

  updateCode = (newCode) => {
    this.setState({code: newCode})
  }

  handleRun = () => {
    fetch(executorUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.code)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  };

  render() {
    return(
    <React.Fragment>
    <Bars onRun={this.handleRun}/>
    <Cell initialValue={this.state.code} updateCode={this.updateCode}/>
    </React.Fragment>
    );
  };
}

export default App;
