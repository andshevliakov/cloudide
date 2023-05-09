import CodeManager from '../api/codeManager/codeManager'
import Bars from './bars/Bars'
import Cell from './cell/Cell'
import { useState } from 'react';

const codeManager = new CodeManager();

const MainCanvas = () => {

    const [runResult, setRunResult] = useState('');
    const [runResultExists, setRunResultExists] = useState(false);
    const [code, setCode] = useState('');

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