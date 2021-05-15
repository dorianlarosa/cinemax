import React, { Component } from "react";
import logo from "../../assets/images/logo.svg";

import SearchBar from "./search-bar/SearchBar";

import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import "./Navbar.scss";

import { ReactComponent as MenuIcon } from "./utils/menu-icon.svg";


class Navbar extends Component {
  render() {
    return (
      <div className="container navbar">
        <img src={logo} className="logo" alt="logo" />
        <div className="btn-toggle-menu">
          <MenuIcon />
        </div>
        <ul className="menu">
          <li>
            <SearchBar
              updateSearchMovies={this.props.updateSearchMovies}
              toggleSearch={this.props.toggleSearch}
              search={this.props.search}
            />
          </li>
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
