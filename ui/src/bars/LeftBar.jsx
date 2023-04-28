import "./LeftBar.css"
import documentlogo from "../assets/document-icon.png"
import gitlogo from "../assets/git-icon.png"
import '../assets/styles/variables.css'

const leftbarStyle = {
    width: 'calc(var(--leftbar-width) - 10px)', 
    height: 'auto',
}

function Leftbar() {
    return (
    <div className="left-bar">
        <nav className="left-bar">
            <ul>
                <li><a href="#"><img style={leftbarStyle} src={documentlogo} alt="Documents"/></a></li>
                <li><a href="#"><img style={leftbarStyle} src={gitlogo} alt="Git"/></a></li>
            </ul>
        </nav>
    </div>
    )
}

export default Leftbar