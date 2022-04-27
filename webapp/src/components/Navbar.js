import "../sass/navBar.scss";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useContextApp } from "../context/contextApp";
//import Logo from "./Logo"
import { useState } from "react";
const Navbar = () => {
  const [displayLogout, setDisplayLogout] = useState(false);
  const { sideToggle, userLogout, user } = useContextApp();
  return (
    <div className="navCom">
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={sideToggle}>
          <FaAlignLeft></FaAlignLeft>
        </button>
        <div>
          <h3 className="logo-txt">Track Your Job Applications</h3>
        </div>
        <div className="button-container">
          <button
            type="button"
            className="btn"
            onClick={() => setDisplayLogout(!displayLogout)}
          >
            <FaUserCircle></FaUserCircle>
            {user?.name}
            <FaCaretDown></FaCaretDown>
          </button>
          <div className={displayLogout ? "drpdwm show-drpdwm" : "drpdwm"}>
            <button
              type="button"
              className="drpdwn-button"
              onClick={userLogout}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
