import React, { Component, useEffect, useState } from "react";
import apiMovie, { apiMovieMapDataDetails } from "../../conf/api.movie";
import ReactPlayer from "react-player";
import { ReactComponent as CloseIcon } from "./utils/close.svg";


import { Duration } from "../";
import { VideoPlayer } from "../";


import screenfull from "screenfull";

import "./MovieDetails.scss";

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: undefined,
      show: false,
      displayVideo: "none",
      canPlayVideo : true
    }; 
  }

  getMovie() {
    Promise.all([
      apiMovie.get(`/movie/${this.props.movieId}?language=fr-FR`),
      apiMovie.get(`/movie/${this.props.movieId}/videos?language=fr-FR`),
      apiMovie.get(
        `/movie/${this.props.movieId}/recommendations?language=fr-FR&page=1`
      ),
    ])
      .then(([movieInformations, movieVideo, moviesSimilar]) => ({
        movieInformations: movieInformations.data,
        movieVideo: movieVideo.data.results,
        moviesSimilar: moviesSimilar.data.results,
      }))
      .then(({ movieInformations, movieVideo, moviesSimilar }) => {
        // merge pages
        const allInformationsMovie = {
          informations: movieInformations,
          video: movieVideo,
          similar: moviesSimilar,
        };

        const moviesDetails = apiMovieMapDataDetails(allInformationsMovie);

        this.setState((prevState) => ({
          movie: moviesDetails,
        }));
      });
  }

  closePanel = () => {
    this.setState({ canPlayVideo: false });
    this.props.toggleDetailsPanel();
  };

  componentDidUpdate(prevProps) {
    if (this.props.movieId !== prevProps.movieId) {
      this.getMovie();
    }

    if (this.props.show && this.state.canPlayVideo === false) {
      this.setState({ canPlayVideo: true });
    }
  }
  render() {

    let showStatus = this.props.show ? " show" : "";

    return (
      <>
        {this.state.movie ? (
          <>
            <div id="bg-blur" className={showStatus} 
              onClick={this.closePanel}>
              <div
                id="movie-details"
                className={showStatus}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="content-movie-details">

                <CloseIcon className="close-btn" onClick={this.closePanel}/>

                <VideoPlayer
                url={this.state.movie.video_url}
                background_image={this.state.movie.background_image} 
                canPlayVideo={this.state.canPlayVideo}/>
               
                <div className="informations-movie-details">
                  <div className="header-details">
                    <span className="movie-title">
                      {this.state.movie.title}
                    </span>
                    <span className="movie-note">
                      {this.state.movie.vote}/10
                    </span>
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
                        <span>{this.state.movie.production_companie.name}</span>
                        <span>{this.state.movie.budget}</span>
                      </div>
                    </div>
                  </div>

                  <div className="list-suggestion">
                    <p className="title">Titres similaires</p>
                  </div>
                </div>
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
              <div id="movie-details" className={showStatus}></div>
            </div>
          </>
        )}
      </>
    );
  }
}

export default MovieDetails;
