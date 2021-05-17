import React, { Component } from "react";
import MovieElement from "../movie-element/MovieElement";
import "./ListMovies.scss";

class ListMovies extends Component {
  render() {
    const listAllMovies = this.props.movies.map((movie, index) => (
      <div className="column">
        <MovieElement
          key={movie.id}
          movie={movie}
          updateSelectedMovie={this.props.updateSelectedMovie}
          toggleDetailsPanel={this.props.toggleDetailsPanel}
        />
      </div>
    ));

    return (
      <div className="list-movies container">
        <div className="row">{listAllMovies}</div>
      </div>
    );
  }
}

export default ListMovies;
