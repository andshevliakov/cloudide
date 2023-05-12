import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AuthPage from './authPages/AuthPage';
import MainCanvas from './mainCanvas/MainCanvas';

class App extends React.Component {

  render() {
    return (
      <Router basename="/ide">
        <Routes>
          <Route path="/" element={
            <MainCanvas />
          } />
          <Route path="/login" element={
            <AuthPage />
          } />
          <Route path="/signup" element={
            <AuthPage />
          } />
        </Routes>
      </Router >
    )
  }
}

export default App