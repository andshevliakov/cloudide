import "./LeftBar.css";
import PropTypes from "prop-types";
import '../../assets/styles/variables.css';
import packageslogo from "../../assets/packages.png";
import { useState } from "react";
import PackageManager from "../../api/packageManager/packageManager";
import { useNavigate } from "react-router";

const packageManager = new PackageManager();

const leftbarStyle = {
    width: 'calc(var(--leftbar-width) - 10px)',
    height: 'auto',
}

const LeftBar = () => {

    const [showMenu, setShowMenu] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [installationResult, setInstallationResult] = useState();
    const navigate = useNavigate();

    const handleKeyDown = async (event) => {
        if (event.keyCode === 13) {
            const response = await packageManager.installPackage(searchTerm);
            if (response.status !== 401) {
                setInstallationResult(response.data.message);
            } else {
                navigate('/login');
            }
        }
    };

    const handleChangeInputField = (event) => {
        setSearchTerm(event.target.value);
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className="left-bar">
            <nav className="left-bar">
                <ul>
                    <li>
                        <button onClick={toggleMenu}>
                            <img
                                style={leftbarStyle}
                                src={packageslogo}
                                alt="Packages"
                            />
                        </button>
                        {showMenu && (
                            <div className="left-bar-menu">
                                <input
                                    type="text"
                                    placeholder="Package name"
                                    value={searchTerm}
                                    onChange={handleChangeInputField}
                                    onKeyDown={handleKeyDown}
                                />
                                Search repository: conda-forge
                                Result: {installationResult}
                            </div>
                        )}
                    </li>
                </ul>
            </nav>
        </div>
    );
}

LeftBar.propTypes = {
    installationResult: PropTypes.string,
};

export default LeftBar;