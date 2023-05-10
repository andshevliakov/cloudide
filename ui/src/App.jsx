import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AuthPage from './authPages/AuthPage';
import MainCanvas from './mainCanvas/MainCanvas';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      errorMessage: '',
      showError: '',
    };
  }

  // componentDidMount() {
  //   this.verifyExistingToken();
  // }

  // verifyExistingToken = async () => {
  //   if ('auth-token' in localStorage) {
  //     const token = localStorage.getItem('auth-token');
  //     if (await verifyToken(token)) {
  //       this.setState({ isAuthenticated: true });
  //     } else {
  //       localStorage.removeItem('auth-token');
  //     }
  //   }
  // };

  render() {
    return (
      <Router basename='/ide'>
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