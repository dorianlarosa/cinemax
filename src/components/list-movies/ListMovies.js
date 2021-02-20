import React, { Component } from "react";
import MovieElement from "../movie-element/MovieElement";

import "./ListMovies.scss";

class ListMovies extends Component {
  render() {
    const listAllMovies = this.props.movies.map((movie, index) => (
      <div key={movie.id} className="column">
        <MovieElement movie={movie} />
      </div>
    ));

    return (
      <div className="list-movies container">
        <div className="row">{listAllMovies} </div>
      </div>
    );
  }
}

export default ListMovies;
