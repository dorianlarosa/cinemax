import React, { Component, useEffect, useState } from "react";
import apiMovie, { apiMovieMapDataDetails } from "../../conf/api.movie";

import "./MovieDetails.scss";

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: undefined,
      movieLoaded: false,
      show: false,
    };
  }

  getMovie() {
    apiMovie
      .get(`/movie/${this.props.movieId}?language=fr-FR`)
      .then((movie) => movie.data)
      .then((movie) => {
        const moviesDetails = apiMovieMapDataDetails(movie);
        console.log(moviesDetails);
        this.setState((prevState) => ({
          movie: moviesDetails,
        }));
      });
  }

  clickBgBlur = () => {
    this.props.toggleDetailsPanel();
  };

  componentDidUpdate(prevProps) {
    if (this.props.movieId !== prevProps.movieId) {
      this.getMovie();
    }
  }

  render() {
    let showStatus = this.props.show ? "show" : "";

    return (
      <>
        {this.state.movie ? (
          <>
            <div
              id="bg-blur"
              className={showStatus}
              onClick={this.props.toggleDetailsPanel}
            ></div>
            <div id="movie-details" className={showStatus}>
              <div className="video"></div>
              <div className="content-movie-details">
                <div className="header-details">
                  <span className="movie-title">{this.state.movie.title}</span>
                  <span className="movie-note">{this.state.movie.vote}/10</span>
                </div>
                <div className="movie-genre">{this.state.movie.genres}</div>
                <p className="movie-description">
                  {this.state.movie.description}
                </p>
                <div className="list-details">
                  <p className="title">Détails</p>
                  <div className="list">
                    <div className="col-label">
                      <span>Durée :</span>
                      <span>Production :</span>
                      <span>Budget :</span>
                    </div>
                    <div className="col-value">
                      <span>{this.state.movie.runtime}</span>
                      <span>
                        {this.state.movie.production_companie.name}

                      </span>
                      <span>
                        {this.state.movie.budget}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="list-suggestion">
                  <p className="title">Titres similaires</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
          <div
            id="bg-blur"
            className={showStatus}
            onClick={this.props.toggleDetailsPanel}
          >
          </div>

          <div id="movie-details" className={showStatus}>
           
          </div>
        </>
        )}
      </>
    );
  }
}

export default MovieDetails;
