import "./LeftBar.css"
import '../assets/styles/variables.css'
import packageslogo from "../assets/packages.png"
import { useState } from "react"

const leftbarStyle = {
    width: 'calc(var(--leftbar-width) - 10px)',
    height: 'auto',
}

function Leftbar(props) {

    const [showMenu, setShowMenu] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [installationResult, setInstallationResult] = useState();

    const handleKeyDown = async (event) => {
        if (event.keyCode === 13) {
            const response = await props.installPackage(searchTerm);
            setInstallationResult(response.data.message);
        }
    };

    const handleChange = (event) => {
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
                            <img style={leftbarStyle} src={packageslogo} alt="Packages" />
                        </button>
                        {showMenu && (
                            <div className="left-bar-menu">
                                <input
                                    type="text"
                                    placeholder="Package name"
                                    value={searchTerm}
                                    onChange={handleChange}
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
    )
}

export default Leftbar