import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './SignupPage.css';

const SignupPage = ({ onSignUp }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate()

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

    const handleSubmit = (event) => {
        event.preventDefault();
        onSignUp({ name, surname, username, password });
        navigate('/login')
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
        <div className='container'>
            <div className="signup-page">
                <Container>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicName">
                                    <Form.Control type="text" placeholder="Name" value={name} onChange={handleNameChange} />
                                </Form.Group>

                                <Form.Group controlId="formBasicSurname">
                                    <Form.Control type="text" placeholder="Surname" value={surname} onChange={handleSurnameChange} />
                                </Form.Group>

                                <Form.Group controlId="formBasicUsername">
                                    <Form.Control type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                                </Form.Group>

                                <Form.Group controlId="formBasicConfirmPassword">
                                    <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="btn-block" disabled={!isFormValid()}>
                                    Sign Up
                                </Button>
                                <div className="auth-page__signup">
                                    Already have an account? <Link to='/login'>Log in</Link>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default SignupPage;
