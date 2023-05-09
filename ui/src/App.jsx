import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { SHA256 } from 'crypto-js';
import routes from './routes';
import managerUrl from './envloader';
import SignupPage from './authPages/SignupPage';
import AuthPage from './authPages/AuthPage';
import MainCanvas from './mainCanvas/MainCanvas';
import User from './entities/user';
import UserManager from './api/userManager/userManager';
import TokenManager from './api/tokenManager/tokenManager';

const userManager = new UserManager()
const tokenManager = new TokenManager()

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

  verifyUser = async (username, password) => {
    const url = managerUrl + routes.user_route + '/verify';
    try {
      const response = await axios.get(url, {
        params: {
          username: username,
          password: SHA256(password).toString()
        }
      });
      return response;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        this.setState({ errorMessage: 'Invalid username or password', showError: true });
        setTimeout(() => {
          this.setState({ showError: false });
        }, 5000);
      } else {
        console.log(error.response.status + error.response.data);
      }
      return error.response;
    }
  };

  createUser = async (name, surname, username, password) => {
    const url = managerUrl + routes.user_route + '/create'
    try {
      const response = await axios.post(url, {
        'name': name,
        'surname': surname,
        'username': username,
        'password': SHA256(password).toString()
      });
      return response.status
    } catch (error) {
      console.error(`${error.response.status} ${error.response.data}`);
      return error.response.status
    }
  };

  onSignUp = async ({ name, surname, username, password }) => {
    const status = await this.createUser(name, surname, username, password)
    if (status !== 201) {
      this.setState({ errorMessage: 'User not created', showError: true });
      setTimeout(() => {
        this.setState({ showError: false });
      }, 5000);
    }
  };

  onLogin = async ({ username, password }) => {
    const user = new User('', username, password);
    const response = await userManager.verifyUser(user);
    if ('username' in response.data) {
      try {
        const response = await tokenManager.generateToken(user.username);
        localStorage.setItem('user', user.username)
        localStorage.setItem('auth-token', response.data.token);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.setState({ errorMessage: 'Invalid username or password', showError: true });
          setTimeout(() => {
            this.setState({ showError: false });
          }, 5000);
        } else {
          console.log(error.response.status + error.response.data);
        }
      }
    }
  };


  render() {
    const { errorMessage } = this.state;
    return (
      <Router basename='/ide'>
        <Routes>
          <Route path="/" element={
            <MainCanvas />
          } />
          <Route path="/signup" element={
            <SignupPage onSignUp={this.onSignUp} />
          } />
          <Route path="/login" element={
            <AuthPage onLogin={this.onLogin} />
          } />
        </Routes>
        {
          this.state.showError && (
            <div className="error-banner">{errorMessage}</div>
          )
        }
      </Router >
    )
  }
}

export default App