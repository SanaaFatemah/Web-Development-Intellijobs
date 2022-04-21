import Wrapper from "../assets/wrappers/Navbar"
import {FaAlignLeft, FaUserCircle, FaCaretDown} from 'react-icons/fa'
import {useContextApp} from "../context/contextApp"  
//import Logo from "./Logo"
import { useState } from "react"
const Navbar = () => {
    const [showLogout , setShowLogout] = useState(false)
    const {toggleSidebar} = useContextApp()
    return (
        <Wrapper>
           <div className="nav-center">
                <button type = "button" className="toggle-btn" 
                onClick={toggleSidebar}>
                    <FaAlignLeft>

                    </FaAlignLeft>
                </button>
                <div>
                    <h3 className="logo-text">
                        dashboard
                    </h3>
                </div>
                <div className="btn-container">
                    <button type = "button" className="btn"
                    onClick={() => setShowLogout(!showLogout)}>
                    <FaUserCircle></FaUserCircle> 
                    sanaa   
                    <FaCaretDown></FaCaretDown>
                    </button>
                    <div className={showLogout?"dropdown show-dropdown":"dropdown"}>
                        <button type = "button" className="dropdown-btn"
                        onClick={() => console.log("logout user")}>
                            logout
                        </button>
                    </div>

                </div>
           </div>
        </Wrapper>
    )
}

export default Navbar