import React from "react";
import { Link } from "react-router-dom";

function FrontPage() {
  return (
    <div className="container page">
      <h4>Job Application Tracker</h4>
      <p>
        Turn your process expertise into apps that streamline your most critical
        work. Streamline processes, eliminate errors & run real-time reports.
        Request a Demo. Automations.
      </p>
      <Link to="/RegisterUser" className="btn btn-hero">
        Login/Register
      </Link>
    </div>
  );
}

export default FrontPage;
