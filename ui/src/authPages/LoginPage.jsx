import React, { useState } from 'react';
import './LoginPage.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await onLogin({ username, password });
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
                                    Don't have an account?<br />
                                    <Link to="/signup">
                                        Sign up
                                    </Link>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div >

    );
};

export default LoginPage;
