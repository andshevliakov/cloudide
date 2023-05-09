import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './SignupPage.css';
import User from '../entities/user';
import UserManager from '../api/userManager/userManager';
import Banner from '../banners/Banner';
import BannerState from '../entities/banner';

const userManager = new UserManager()

const SignupPage = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [bannerState, setBannerState] = useState('');
    const [bannerMessage, setBannerMessage] = useState('');
    const [showBanner, setShowBanner] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let bannerTimer;
        if (showBanner) {
            bannerTimer = setTimeout(() => {
                setShowBanner(false);
            }, 5000);
        }
        return () => clearTimeout(bannerTimer);
    }, [showBanner]);

    const onSignUp = async ({ name, surname, username, password }) => {
        const user = new User(name, surname, username, password);
        const response = await userManager.createUser(user);
        if (response.status === 201) {
            if ('username' in response.data) {
                setBannerState(BannerState.Info);
                setBannerMessage(response.data.message.toString());
                setShowBanner(true);
            }
        } else if (response.status >= 400) {
            setBannerState(BannerState.Error);
            if (response.data) {
                setBannerMessage(response.data.message.toString());
            } else {
                setBannerMessage('Internal Server Error');
            }
            setShowBanner(true);
        }
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleSurnameChange = (event) => {
        setSurname(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await onSignUp({ name, surname, username, password });
    };

    const isFormValid = () => {
        return (
            name !== '' &&
            surname !== '' &&
            username !== '' &&
            password !== '' &&
            password === confirmPassword
        );
    };

    return (
        <div>
            <div className='container'>
                <div className="signup-page">
                    <Container>
                        <Row>
                            <Col
                                md={{ span: 6, offset: 3 }}
                                lg={{ span: 4, offset: 4 }}
                            >
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formBasicName">
                                        <Form.Control
                                            type="text"
                                            placeholder="Name"
                                            value={name}
                                            onChange={handleNameChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicSurname">
                                        <Form.Control
                                            type="text"
                                            placeholder="Surname"
                                            value={surname}
                                            onChange={handleSurnameChange}
                                        />
                                    </Form.Group>

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

                                    <Form.Group controlId="formBasicConfirmPassword">
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm Password"
                                            value={confirmPassword}
                                            onChange={handleConfirmPasswordChange}
                                        />
                                    </Form.Group>

                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="btn-block"
                                        disabled={!isFormValid()}
                                    >
                                        Sign Up
                                    </Button>
                                    <div className="auth-page__signup">
                                        Already have an account?
                                        <Link to='/login'>
                                            Log in
                                        </Link>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
            {showBanner && (
                <Banner state={bannerState} message={bannerMessage} />
            )}
        </div>
    );
};

export default SignupPage;
