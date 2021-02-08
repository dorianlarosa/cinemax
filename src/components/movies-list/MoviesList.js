import React, { Component } from "react";
import "./MoviesList.scss";
import Carousel from 'react-elastic-carousel' 

import MovieElement from "./movie-element/MovieElement";


import dataMovies from "./data";

class MoviesList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      movies: dataMovies,
    };
  }

  render() {
    return (
      <div id="movies-list">
        <Carousel isRTL={true} itemsToScroll={4} itemsToShow={4}>
          {this.state.movies.map((movie) => (
          <MovieElement key={movie.id} movie={movie} />
          ))}
        </Carousel>
      </div>
    );
  }
}

export default MoviesList;
