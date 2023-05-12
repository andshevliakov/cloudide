import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import User from '../entities/user';
import UserManager from '../api/userManager/userManager';
import TokenManager from '../api/tokenManager/tokenManager';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Banner from '../banners/Banner';
import BannerState from '../entities/banner';

const userManager = new UserManager()
const tokenManager = new TokenManager()

const AuthPage = () => {
    const [bannerState, setBannerState] = useState('');
    const [bannerMessage, setBannerMessage] = useState('');
    const [showBanner, setShowBanner] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const isLoginPage = location.pathname === '/login';
    const isSignupPage = location.pathname === '/signup';

    useEffect(() => {
        let bannerTimer;
        if (showBanner) {
            bannerTimer = setTimeout(() => {
                setShowBanner(false);
            }, 5000);
        }
        return () => clearTimeout(bannerTimer);
    }, [showBanner]);

    useEffect(() => {
        verifyExistingToken();
    })

    const verifyExistingToken = () => {
        if ('auth-token' in localStorage) {
            tokenManager.verifyToken().then((result) => {
                if (!result) {
                    localStorage.removeItem('auth-token');
                } else {
                    navigate('/');
                }
            })
        }
    };


    const onLogin = async ({ username, password }) => {
        const user = new User('', '', username, password);
        const response = await userManager.verifyUser(user);
        if (response.status === 200) {
            const response = await tokenManager.generateToken(user.username);
            if (response.status === 200) {
                localStorage.setItem('auth-token', response.data.token);
                navigate('/')
            } else if (response.status >= 400) {
                setBannerState(BannerState.Error);
                if (response.data) {
                    setBannerMessage(response.data.message.toString());
                } else {
                    setBannerMessage('Internal Server Error');
                }
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

    const onSignUp = async ({ name, surname, username, password }) => {
        const user = new User(name, surname, username, password);
        const response = await userManager.createUser(user);
        if (response.status === 201) {
            setBannerState(BannerState.Info);
            setBannerMessage(response.data.message.toString());
            setShowBanner(true);
            navigate('/login')
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

    return (
        <div>
            {isSignupPage && <SignupPage onSignUp={onSignUp} />}
            {isLoginPage && <LoginPage onLogin={onLogin} />}
            {showBanner && (
                <Banner state={bannerState} message={bannerMessage} />
            )}
        </div>
    );

};

export default AuthPage;
