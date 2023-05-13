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