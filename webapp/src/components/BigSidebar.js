import "../sass/BigSideBar.scss";
import Logo from "../components/Logo";
import NavLinks from "./NavLinks";
import { useContextApp } from "../context/contextApp";

const BigSidebar = () => {
  const { displaySideBar, sideToggle } = useContextApp();
  return (
    <div className="bigSidecom">
      <div
        className={
          displaySideBar
            ? "sidebar-container"
            : "sidebar-container display-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks sideToggle={sideToggle} />
        </div>
      </div>
    </div>
  );
};

export default BigSidebar;
