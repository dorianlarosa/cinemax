import React, { Component } from "react";
import logo from "../../assets/images/logo.svg";

import SearchBar from "./search-bar/SearchBar";

import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "./Navbar.scss";

import { ReactComponent as MenuIcon } from "./utils/menu-icon.svg";

class Navbar extends Component {

constructor(props) {
    super(props);
    this.state = {
      menuMobileIsOpen: false
    };
  }
  toggleMenuMobile = () => {
    this.setState((prevState) => ({
      menuMobileIsOpen: !prevState.menuMobileIsOpen,
    }));
  }

  closeMenuMobile = () => {
    this.setState({
      menuMobileIsOpen: false,
    });
  }


 componentDidMount() {
    window.addEventListener("resize", (e) => {
      if (window.innerWidth >= 992) {
        this.closeMenuMobile();
      }
    });

  }

  render() {
    let classOpenMenuMobile = this.state.menuMobileIsOpen ? " show" : "";

    return (
      <>
      <div id="bg-blur-menu" className={classOpenMenuMobile} onClick={this.closeMenuMobile}></div>
      <div className="container navbar">
        <img src={logo} className="logo" alt="logo" />

        <div className={"btn-toggle-menu" + classOpenMenuMobile} onClick={this.toggleMenuMobile}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <div className={"container-menu" + classOpenMenuMobile}>
          
          <img src={logo} className="logo logo-menu-mobile" alt="logo" />
          <ul className="menu">
            <li>
              <SearchBar
                updateSearchMovies={this.props.updateSearchMovies}
                toggleSearch={this.props.toggleSearch}
                search={this.props.search}
                closeMenuMobile={this.closeMenuMobile}
              />
            </li>
            <li className="menu__item">Accueil</li>
            <li className="menu__item">Films</li>
            <li className="menu__item">Séries</li>
            <li className="menu__item">Ma liste</li>
          </ul>
        </div>
      </div>
      </>
    );
  }
}

export default Navbar;
