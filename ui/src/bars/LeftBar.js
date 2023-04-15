import "./LeftBar.css"
import documentlogo from "../assets/document-icon.png"
import '../assets/styles/variables.css'
const leftbarStyle = {
    width: 'calc(var(--leftbar-width) - 10px)', 
    height: 'auto',
}

function Leftbar() {
    return (
    <div class="left-bar">
        <nav class="left-bar">
            <ul>
            <li><a href="#"><img style={leftbarStyle} src={documentlogo} alt="Documents"/></a></li>
            <li><a href="#"><img src="downloads.png" alt="Downloads"/></a></li>
            <li><a href="#"><img src="pictures.png" alt="Pictures"/></a></li>
            <li><a href="#"><img src="music.png" alt="Music"/></a></li>
            </ul>
        </nav>
    </div>
    )
}

export default Leftbar