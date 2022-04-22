import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import { useContextApp } from "../context/contextApp";
import NavLinks from "./NavLinks";

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useContextApp();
  return (
    <Wrapper>
      <h4>
        <div
          className={
            showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
          }
        >
          <div className="content">
            <button type="button" className="close-btn" onClick={toggleSidebar}>
              <FaTimes />
            </button>
            <header>
              <Logo />
            </header>
            <NavLinks toggleSidebar={toggleSidebar} />
          </div>
        </div>
      </h4>
    </Wrapper>
  );
};

export default SmallSidebar;
