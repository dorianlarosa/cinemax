import React, { Component } from "react";
import logo from "../../images/logo.svg";
import "./Navbar.scss";

class Navbar extends Component {
  render() {
    return (
      <div id="navbar" className="container">
        <img src={logo} className="logo" alt="logo" />
        <ul className="menu">
          <li className="menu__item">Accueil</li>
          <li className="menu__item">Favoris</li>
          <li className="menu__item">Rechercher</li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
