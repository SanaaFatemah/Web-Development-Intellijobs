import { NavLink } from "react-router-dom";
import links from "../utilities/links";

const NavLinks = ({ sideToggle }) => {
  return (
    <div className="nav-links">
      {links.map((item) => {
        const { text, path, id, icon } = item;
        return (
          <NavLink
            to={path}
            key={id}
            onClick={sideToggle}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
