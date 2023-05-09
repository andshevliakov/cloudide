import './ToolBar.css';

const ToolBar = (props) => {
    const { handleRun } = props;

    const handleRunClick = () => {
        handleRun && handleRun();
    };

    return (
        <div className="toolbar">
            <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"
            />
            <div className="toolbar-leftside"></div>
            <div className="toolbar-rightside">
                <button onClick={handleRunClick}>
                    <span className="material-icons">
                        play_arrow
                    </span>
                </button>
            </div>
        </div>
    );
}

export default ToolBar;
