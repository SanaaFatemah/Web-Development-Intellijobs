import "../sass/smallSidebar.scss";
import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import { useContextApp } from "../context/contextApp";
import NavLinks from "./NavLinks";

const SmallSidebar = () => {
  const { showSidebar, sideToggle } = useContextApp();
  return (
    <h4>
      <div
        className={
          showSidebar
            ? "sidebar-container display-sidebar"
            : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={sideToggle}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks sideToggle={sideToggle} />
        </div>
      </div>
    </h4>
  );
};

export default SmallSidebar;
