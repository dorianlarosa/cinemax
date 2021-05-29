import React, { Component } from "react";
import {
  Navbar,
  MovieDetails,
} from "./components";

import { Home, Movies } from "./routes";

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      searchMovies: [],
      selectedMovie: undefined,
      typeOfSelectedMovie:undefined,
      showDetails: false,
    };
  }

  /******
   * DISABLE TRANSITION WHEN WINDOW RESIZE
   ******/

  disableTransitionsResizeWindow() {
    let resizeTimer;
    window.addEventListener("resize", () => {
      document.body.classList.add("resize-animation-stopper");
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
      }, 400);
    });
  }

  /******
   * SEARCH MOVIE
   ******/
  toggleSearch = () => {
    this.setState((prevState) => ({
      search: !prevState.search,
    }));
  };

  updateSearchMovies = (movies) => {
    this.setState({
      searchMovies: movies,
    });
  };

  /******
   * UPDATE SELECTED (CLICK MOVIE)
   ******/
  updateSelectedMovie = (movieId, typeMovie) => {
    this.setState({
      selectedMovie: movieId,
      typeOfSelectedMovie : typeMovie
    });
  };

  /******
   * DETAILS PANEL
   ******/
  toggleDetailsPanel = () => {
    this.setState((prevState) => ({
      showDetails: !prevState.showDetails,
    }));
  };

  /******
   * HOOK
   ******/
  componentDidMount() {
    this.disableTransitionsResizeWindow();
  }

  render() {
    // DISABLE SCROLL IF SHOW DETAILS PANEL
    if (this.state.showDetails) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return (
      <div className="App">
        <Router>
          <Navbar
            toggleSearch={this.toggleSearch}
            search={this.state.search}
            updateSearchMovies={this.updateSearchMovies}
          />

          <Switch>
            <Route exact path="/"
              render={() => (
                <Home
                  updateSelectedMovie={this.updateSelectedMovie}
                  toggleDetailsPanel={this.toggleDetailsPanel}
                  search={this.state.search}
                  searchMovies={this.state.searchMovies} 
                  showDetails={this.state.showDetails}

                />
              )}
            />
            <Route path="/films" render={() => (
                <Movies
                  updateSelectedMovie={this.updateSelectedMovie}
                  toggleDetailsPanel={this.toggleDetailsPanel}
                  search={this.state.search}
                  searchMovies={this.state.searchMovies} 
                  showDetails={this.state.showDetails}
                />
              )} />

          </Switch>
        </Router>

        <MovieDetails
          show={this.state.showDetails}
          movieId={this.state.selectedMovie}
          movieType={this.state.typeOfSelectedMovie}
          toggleDetailsPanel={this.toggleDetailsPanel}
        />
      </div>
    );
  }
}

export default App;
