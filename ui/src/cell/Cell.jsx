import { python } from '@codemirror/lang-python';
import CodeMirror from '@uiw/react-codemirror';
import { useState, useEffect } from 'react';
import '../assets/styles/3024-night.css';
import "./Cell.css";

function Cell(props) {
  const [resultVisible, setResultVisible] = useState(true);

  const handleChange = (value) => {
    props.updateCode(value);
  };

  useEffect(() => {
    setResultVisible(true);
  }, [props.resultExists]);

  useEffect(() => {
    const resultBar = document.querySelector('.execution-result-bar');
    setResultVisible(resultBar && resultBar.offsetHeight > 0);
  }, []);

  return (
    <div className="codemirror-div" style={{ maxHeight: `calc(100vh - ${resultVisible ? 'var(--resultbar-height)' : 0} - var(--topbar-height) - var(--toolbar-height))` }}>
      <CodeMirror
        value={props.initialValue}
        extensions={[python()]}
        theme='dark'
        onChange={handleChange}
      />
    </div>
  );
}

export default Cell;
