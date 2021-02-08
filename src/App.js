import React, { Component } from "react";
import { Navbar, MoviesList, MovieDetails } from "./components";
import SliderHeader from "./components/slider-header/SliderHeader";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import dataMovies from "./data";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: dataMovies,
      infinite: false,
    };
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <SliderHeader />
        <MoviesList category="Films en tendance" movies={this.state.movies} showLinkSeeAll={false} />
        <MoviesList category="Series en tendance" movies={this.state.movies} showLinkSeeAll={false}/>
        <MoviesList category="Films comedie" movies={this.state.movies} showLinkSeeAll={true}/>
        <MoviesList category="Films d'horreur" movies={this.state.movies} showLinkSeeAll={true}/>
        <MovieDetails />
      </div>
    );
  }
}

export default App;
