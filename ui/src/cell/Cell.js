import { python } from '@codemirror/lang-python';
import CodeMirror from '@uiw/react-codemirror';
import '../assets/styles/3024-night.css';
import "./Cell.css";

function Cell(props) {

  const handleChange = (value) => {
    props.updateCode(value);
  };

  return (
    <div className="codemirror-div">
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
