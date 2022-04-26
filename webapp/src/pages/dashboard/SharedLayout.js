import { Outlet, Link } from "react-router-dom";
import "../../sass/SharedLayou.scss";

import { Navbar, BigSidebar, SmallSidebar } from "../../components";
const SharedLayout = () => {
  return (
    <main className="dashboard">
      <SmallSidebar></SmallSidebar>
      <BigSidebar></BigSidebar>
      <div>
        <Navbar></Navbar>
        <div className="dashboard-page">
          <Outlet></Outlet>
        </div>
      </div>
    </main>
  );
};

export default SharedLayout;
