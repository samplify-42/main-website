import React from 'react';
import './navbar.css';
import logo from '../../images/logo.png';
import { useNavigate } from "react-router-dom";
import { Button } from '@mantine/core';

function Navbar() {
  const navigate = useNavigate();

  return (
    <section style={{
      zIndex:'10'
    }} className="navbar navbar-fixed">
      <div className="div_logo_navbar">
        <a href="/home" className="content-logo">
          <img className="logo" alt="Samplify" src={logo}></img>
        </a>
      </div>
      <a className="div_marketplace_navbar">
        <button style={{fontWeight: 'bold'}}>MarketPlace</button>
      </a>
      <div style={{justifyContent:'space-around'}} className="div_navigation_navbar">
        <Button onClick={() => navigate('/home')}>
          Accueil
        </Button>
        <Button onClick={() => navigate('/profile')}>
          Profile
        </Button>
      </div>
    </section>
  );
}

export default Navbar;
