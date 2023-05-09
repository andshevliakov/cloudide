import React, { useState } from 'react';
import './AuthPage.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import User from '../entities/user';
import UserManager from '../api/userManager/userManager';
import TokenManager from '../api/tokenManager/tokenManager';

const userManager = new UserManager()
const tokenManager = new TokenManager()

const AuthPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onLogin = async ({ username, password }) => {
        const user = new User('', '', username, password);
        const response = await userManager.verifyUser(user);
        if ('username' in response.data) {
            try {
                const response = await tokenManager.generateToken(user.username);
                localStorage.setItem('auth-token', response.data.token);
            } catch (error) {
                // if (error.response && error.response.status === 404) {
                //     this.setState({ errorMessage: 'Invalid username or password', showError: true });
                //     setTimeout(() => {
                //         this.setState({ showError: false });
                //     }, 5000);
                // } else {
                //     console.log(error.response.status + error.response.data);
                // }
            }
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onLogin({ username, password });
        navigate('/');
    };

    const isFormValid = () => {
        return username !== '' && password !== '';
    }

    return (
        <div className='container'>
            <div className="auth-page">
                <Container>
                    <Row>
                        <Col
                            md={{ span: 6, offset: 3 }}
                            lg={{ span: 4, offset: 4 }}
                        >
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicUsername">
                                    <Form.Control
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={handleUsernameChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="btn-block"
                                    disabled={!isFormValid()}
                                >
                                    Log In
                                </Button>
                                <div className="auth-page__signup">
                                    Don't have an account?
                                    <Link to="/signup">
                                        Sign up
                                    </Link>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default AuthPage;
