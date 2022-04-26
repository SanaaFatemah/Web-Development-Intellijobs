import "../sass/BigSideBar.scss";
import { useContextApp } from "../context/contextApp";
import NavLinks from "./NavLinks";
import Logo from "../components/Logo";

const BigSidebar = () => {
  const { showSideBar, toggleSidebar } = useContextApp();
  return (
    <div className="bigSidecom">
      <div
        className={
          showSideBar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </div>
  );
};

export default BigSidebar;
