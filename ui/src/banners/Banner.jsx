import { useState, useEffect } from "react";
import BannerState from "../entities/banner";
import PropTypes from "prop-types";
import './Banner.css'

const Banner = (props) => {
    const { state, message } = props;
    const [infoMessage, setInfoMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [warningMessage, setWarningMessage] = useState(false);

    useEffect(() => {
        console.log(state, message)
        if (state === BannerState.Error) {
            setErrorMessage(true);
        } else if (state === BannerState.Info) {
            setInfoMessage(true);
        } else if (state === BannerState.Warning) {
            setWarningMessage(true);
        }
    }, [state]);

    return (
        <>
            {errorMessage && <div className="error-banner">{message}</div>}
            {infoMessage && <div className="info-banner">{message}</div>}
            {warningMessage && <div className="warning-banner">{message}</div>}
        </>
    );
};

Banner.propTypes = {
    message: PropTypes.string,
    state: PropTypes.oneOf([
        BannerState.Error,
        BannerState.Info,
        BannerState.Warning,
    ]),
};

export default Banner;
