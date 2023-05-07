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
import managerUrl from './envloader';
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
      result: '',
      resultExists: false,
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
    const url = managerUrl + routes.user_route + '/verify';
    try {
      await axios.get(url, {
        params: {
          username: username,
          password: SHA256(password).toString()
        }
      });
      return true;
    } catch (error) {
      if (error.response && error.response.status === 404) {
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
    const verified = await this.verifyUser(username, password);
    if (verified) {
      try {
        const response = await axios.get(managerUrl + routes.token_route + '/generate', {
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

  handleRun = async () => {
    this.setState({ result: 'test' })
    this.setState({ resultExists: true })
    // Chande to executorUrlh
    const url = managerUrl + routes.code_route + '/run'
    try {
      const response = await axios.post(url, {
        'code': this.state.code
      })
      console.log(response)
    } catch (error) {
      console.error(`${error.response.status} ${error.response.data}`);
    }

  };

  render() {
    const { isAuthenticated, errorMessage, result, resultExists } = this.state;
    return (
      <Router basename='/ui'>
        <Routes>
          <Route path="/" element={
            isAuthenticated ? (
              <>
                <Bars onRun={this.handleRun} result={result} />
                <Cell initialValue={this.state.code} updateCode={this.updateCode} resultExists={resultExists} />
              </>
            ) : (
              <AuthPage onLogin={this.onLogin} />
            )
          } />
          <Route path="/signup" element={<SignupPage onSignUp={this.onSignUp} />} />
          <Route path="/login" element={<AuthPage onLogin={this.onLogin} />} />
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