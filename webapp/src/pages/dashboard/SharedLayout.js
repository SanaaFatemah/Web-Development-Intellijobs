import { Outlet, Link } from "react-router-dom";
import "../../sass/SharedLayou.scss";

import { Navbar, BigSidebar, SmallSidebar } from "../../components";
const SharedLayout = () => {
  return (
    <main className="dashbrd">
      <SmallSidebar></SmallSidebar>
      <BigSidebar></BigSidebar>
      <div>
        <Navbar></Navbar>
        <div className="dashbrd-page">
          <Outlet></Outlet>
        </div>
      </div>
    </main>
  );
};

export default SharedLayout;
