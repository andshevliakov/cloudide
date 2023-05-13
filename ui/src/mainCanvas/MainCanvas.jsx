import { useNavigate } from 'react-router';
import CodeManager from '../api/codeManager/codeManager'
import TokenManager from '../api/tokenManager/tokenManager'
import Bars from './bars/Bars'
import Cell from './cell/Cell'
import { useEffect, useState } from 'react';
import UserManager from '../api/userManager/userManager';
import User from '../entities/user';

const codeManager = new CodeManager();
const tokenManager = new TokenManager();
const userManager = new UserManager();

const MainCanvas = () => {

    const [runResult, setRunResult] = useState('');
    const [runResultExists, setRunResultExists] = useState(false);
    const [sessionUser, setSessionUser] = useState(new User('', '', ''));
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        verifyExistingToken();
        getSessionUser();
    }, [])

    const verifyExistingToken = () => {
        if ('auth-token' in localStorage) {
            tokenManager.verifyToken().then((result) => {
                if (!result) {
                    navigate('/login');
                }
            })
        } else {
            navigate('login');
        }
    };

    const getSessionUser = () => {
        userManager.getUser().then((response) => {
            if (response.status !== 200) {
                localStorage.removeItem('auth-token');
                navigate('/login');
            } else {
                const user = new User(response.data.name, response.data.surname, response.data.username);
                setSessionUser(user);
            }
        })
    };

    const updateUser = async (name, surname, username, password) => {
        const user = new User(name, surname, username, password);
        const response = await userManager.updateUser(user);
        if (response.status !== 401) {
            if (response.status === 200) {
                setSessionUser(user);
            }
        } else {
            navigate('/login');
        }
    };

    const updateCode = (newCode) => {
        setCode(newCode);
    };

    const handleRun = async () => {
        const response = await codeManager.handleRun(code);
        if (response.status !== 401) {
            setRunResult(response.data.message.toString());
            setRunResultExists(true);
        } else {
            navigate('/login');
        }
    };

    return (
        <div>
            <Bars
                handleRun={handleRun}
                runResult={runResult}
                sessionUser={sessionUser}
                updateUser={updateUser}
            />
            <Cell
                initialValue={code}
                updateCode={updateCode}
                runResultExists={runResultExists}
            />
        </div>
    );
}

export default MainCanvas;