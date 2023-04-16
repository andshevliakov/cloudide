import './ToolBar.css'

function ToolBar(props) {
    return (
    <div className="toolbar">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
        <div className="toolbar-leftside"></div>
        <div className="toolbar-rightside">
            <button onClick={props.onRun}><span className="material-icons">play_arrow</span></button>
        </div>
    </div>
    );
}

export default ToolBar
