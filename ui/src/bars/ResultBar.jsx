import React from "react";
import PropTypes from "prop-types";
import "./ResultBar.css";

function ResultBar(props) {
    const { result } = props;

    if (!result) {
        return null;
    }

    return (
        <div className="execution-result-bar">
            <span className="execution-result-bar-content">{result}</span>
        </div>
    );
}

ResultBar.propTypes = {
    result: PropTypes.string,
};

export default ResultBar;
