import { useNavigate } from 'react-router';
import CodeManager from '../api/codeManager/codeManager'
import TokenManager from '../api/tokenManager/tokenManager'
import Bars from './bars/Bars'
import Cell from './cell/Cell'
import { useEffect, useState } from 'react';

const codeManager = new CodeManager();
const tokenManager = new TokenManager();

const MainCanvas = () => {

    const [runResult, setRunResult] = useState('');
    const [runResultExists, setRunResultExists] = useState(false);
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        verifyExistingToken();
    }, [])

    const verifyExistingToken = () => {
        if ('auth-token' in localStorage) {
            tokenManager.verifyToken().then((result) => {
                if (!result) {
                    localStorage.removeItem('auth-token');
                    navigate('/login');
                }
            })
        } else {
            navigate('login');
        }
    };

    const updateCode = (newCode) => {
        setCode(newCode);
    };

    const handleRun = async () => {
        const response = await codeManager.handleRun(code);
        setRunResult(response.data.message.toString());
        setRunResultExists(true);
    };

    return (
        <div>
            <Bars
                handleRun={handleRun}
                runResult={runResult}
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