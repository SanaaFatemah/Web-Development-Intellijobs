import React from "react";
import "./HeroSection.scss";
import "../../App.css";

function HeroSection() {
  return (
    <div className="hero-container">
      <video src="/videos/hero.mp4" autoPlay loop muted />
      <h1>FIND MY DEN</h1>
      <p>Looking for a house?</p>
      <div className="hero-btns">
        <button className="btn-sign-up">Sign Up</button>
        <button className="btn-sign-in">Sign In</button>
      </div>
    </div>
  );
}

export default HeroSection;
