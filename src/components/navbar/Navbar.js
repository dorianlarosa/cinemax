import React, { Component } from "react";
import logo from "../../assets/images/logo.svg";

import SearchBar from "./search-bar/SearchBar";

import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";

import "./Navbar.scss";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuMobileIsOpen: false,
    };
  }
  toggleMenuMobile = () => {
    this.setState((prevState) => ({
      menuMobileIsOpen: !prevState.menuMobileIsOpen,
    }));
  };

  closeMenuMobile = () => {
    this.setState({
      menuMobileIsOpen: false,
    });
  };

  componentDidMount() {
    window.addEventListener("resize", (e) => {
      if (window.innerWidth >= 992) {
        this.closeMenuMobile();
      }
    });
  }

  render() {
    let classOpenMenuMobile = this.state.menuMobileIsOpen ? " show" : "";

    const ListItemLink = ({ to, name, ...rest }) => (
      <Route
        path={to}
        children={() => (
          <li className="menu__item">
            <NavLink
              to={to}
              {...rest}
              activeClassName="active"
              className="menu__link"
            >
              {name}
            </NavLink>
          </li>
        )}
      />
    );

    return (
      <>
        <div
          id="bg-blur-menu"
          className={classOpenMenuMobile}
          onClick={this.closeMenuMobile}
        ></div>
          <div className="container navbar">
            <img src={logo} className="logo" alt="logo" />

            <div
              className={"btn-toggle-menu" + classOpenMenuMobile}
              onClick={this.toggleMenuMobile}
            >
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
                <ListItemLink to="/" name="Accueil" />
                <ListItemLink to="/films" name="Films" />
                <ListItemLink to="/series" name="Séries" />
                <ListItemLink to="/ma-liste" name="Ma liste" />
              </ul>
            </div>
          </div>
      </>
    );
  }
}

export default Navbar;
