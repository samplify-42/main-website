import React from 'react';
import './navbar.css';
import logo from '../../images/logo.png';

function Navbar() {
  return (
    <section id="#myMenu" className="navbar navbar-fixed">
      <div className="div_logo_navbar">
        <a onClick={console.log("okokok")} href="#context" className="content-logo">
          <img className="logo" alt="Samplify" src={logo}></img>
        </a>
      </div>
      <a className="div_marketplace_navbar">
        <button style={{fontWeight: 'bold'}}>MarketPlace</button>
      </a>
      <div className="div_navigation_navbar">
        <a className="btn_accueil navbar-link">
          Accueil
        </a>
        <a className="btn_roadmap navbar-link">
          Tutoriel
        </a>
        <a className="btn_roadmap navbar-link">
          Securité
        </a>
        <a className="btn_team navbar-link">
          Roadmap
        </a>
        <a className="btn_team navbar-link">
          Équipe
        </a>
      </div>
    </section>
  );
}

export default Navbar;
