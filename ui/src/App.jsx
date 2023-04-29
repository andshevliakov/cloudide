import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Cell from './cell/Cell';
import Bars from './bars/Bars';
import AuthPage from './AuthPage';
import { SHA256 } from 'crypto-js';
import routes from './routes';
import executorUrl from './envloader';
import { verifyToken } from './tokenManager';
import SignupPage from './SignupPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      code: '',
      errorMessage: '',
      showError: '',
    };
  }

  componentDidMount() {
    this.verifyExistingToken();
  }

  verifyExistingToken = async () => {
    if ('auth-token' in localStorage) {
      const token = localStorage.getItem('auth-token');
      if (await verifyToken(token)) {
        this.setState({ isAuthenticated: true });
      } else {
        localStorage.removeItem('auth-token');
      }
    }
  };

  verifyUser = async (username, password) => {
    const url = executorUrl + routes.user_route + '/verify';
    try {
      await axios.get(url, {
        params: {
          username: username,
          password: SHA256(password).toString()
        }
      });
      return true;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        this.setState({ errorMessage: 'Invalid username or password', showError: true });
        setTimeout(() => {
          this.setState({ showError: false });
        }, 5000);
      } else {
        console.log(error.response.status + error.response.data);
      }
      return false;
    }
  };

  onSignUp = async ({ name, surname, username, password }) => {
    const url = executorUrl + routes.user_route + '/create'
    try {
      const response = await axios.post(url, {
        'name': name,
        'surname': surname,
        'username': username,
        'password': SHA256(password).toString()
      });
    } catch (error) {
      console.error(`${error.response.status} ${error.response.data}`);
    }
  };

  onLogin = async ({ username, password }) => {
    const verified = await this.verifyUser(username, password);
    if (verified) {
      try {
        const response = await axios.get(executorUrl + routes.token_route + '/generate', {
          params: {
            username: username,
          }
        });
        localStorage.setItem('auth-token', response.data.token);
        this.setState({ isAuthenticated: true });
      } catch (error) {
        console.error(`${error.response.status} ${error.response.data}`);
      }
    }
  };

  updateCode = (newCode) => {
    this.setState({ code: newCode });
  };

  handleRun = () => {
    fetch(executorUrl + routes.code_run_route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.code),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  render() {
    const { isAuthenticated, errorMessage } = this.state;
    return (
      <Router>
        <Routes>
          <Route path="/" element={
            isAuthenticated ? (
              <>
                <Bars onRun={this.handleRun} />
                <Cell initialValue={this.state.code} updateCode={this.updateCode} />
              </>
            ) : (
              <AuthPage onLogin={this.onLogin} />
            )
          } />
          <Route path="/signup" element={<SignupPage onSignUp={this.onSignUp} />} />
          <Route path="/login" element={<AuthPage onLogin={this.onLogin} />} />
        </Routes>
        {this.state.showError && (
          <div className="error-banner">{errorMessage}</div>
        )}
      </Router>
    )
  }
}

export default App