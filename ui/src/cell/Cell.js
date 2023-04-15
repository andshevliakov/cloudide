import { python } from '@codemirror/lang-python';
import CodeMirror from '@uiw/react-codemirror';
import '../assets/styles/3024-night.css'
import "./Cell.css";

function Cell() {
    return (
    <div class="codemirror-div">
    <CodeMirror
      value=""
      extensions={[python()]}
      theme='dark'
      // onChange={onChange}
    />
    </div>
    );
}

export default Cell