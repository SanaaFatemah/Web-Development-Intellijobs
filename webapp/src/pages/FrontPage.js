import React from "react";
import './sass/FrontPage.scss';
import { Link } from "react-router-dom";

function FrontPage() {
  return (
    <div className="container page">
      <video src="/videos/home.mp4" autoPlay loop muted/>
      <h1>Job Search Tracker</h1>
      <p>
          Track all the jobs you apply for at one place!
      </p>
      <Link to="/RegisterUser" className="btn btn-hero">
        Login/Register
      </Link>
    </div>
  );
}

export default FrontPage;
