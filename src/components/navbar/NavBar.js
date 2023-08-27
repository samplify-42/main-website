import React from 'react';
import './navbar.css';
import logo from '../../images/logo.png';

function Navbar() {
  return (
    <section id="#myMenu" className="navbar">
      <div className="div_logo_navbar">
        <a onClick={console.log("okokok")} href="#context" className="content-logo">
          <img className="logo" alt="Samplify" src={logo}></img>
        </a>
      </div>
      <div className='div_accueil_aide_navbar'>
        <a className='btn_accueil_navbar'>
          Accueil
        </a>
        <a className='btn_aide_navbar'>
          Aide
        </a>
      </div>
      <div className='div_marketplace_navbar'>
        <a className="btn_marketplace_navbar">
          <button style={{fontWeight: 'bold'}}>MarketPlace</button>
        </a>
      </div>
      <div className="div_navigation_navbar">
        <a className="btn_profile_navbar">
          Profile
        </a>
        <a className="btn_deconnexion_navbar">
          Déconnexion
        </a>
      </div>
    </section>
  );
}

export default Navbar;
