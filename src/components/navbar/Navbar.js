import React, { Component } from "react";
import logo from "../../assets/images/logo.svg";
import "./Navbar.scss";

import { ReactComponent as MenuIcon } from "./utils/menu-icon.svg"

class Navbar extends Component {
  render() {
    return (
      <div className="container navbar">
          <img src={logo} className="logo" alt="logo" />
          <div className="btn-toggle-menu">
          <MenuIcon />
          </div>
          <ul className="menu">
            <li className="menu__item">Accueil</li>
            <li className="menu__item">Films</li>
            <li className="menu__item">Séries</li>
            <li className="menu__item">Ma liste</li>
          </ul>

        </div>
    );
  }
}

export default Navbar;
