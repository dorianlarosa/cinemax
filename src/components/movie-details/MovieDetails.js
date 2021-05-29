/******
 * COMPONENT PANEL FOR VIEWS DETAILS MOVIE ONCLICK
 ******/

import React, { Component } from "react";
import "./MovieDetails.scss";
import apiMovie, { apiMapDataDetails } from "../../conf/api.movie";
import { ReactComponent as CloseIcon } from "./utils/close.svg";
import { VideoPlayer } from "../";

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: undefined,
      show: false,
      displayVideo: "none",
      canPlayVideo: true,
    };
  }

  /******
   * GET DATA OF MOVIE FROM MOVIE ID
   ******/
  getMovie() {
    let type = this.props.movieType === "Film" ? "movie" : "tv";
    console.log(this.props.movieType);
    Promise.all([
      apiMovie.get(`/${type}/${this.props.movieId}?language=fr-FR`),
      apiMovie.get(`/${type}/${this.props.movieId}/videos?language=fr-FR`),
      apiMovie.get(
        `/${type}/${this.props.movieId}/recommendations?language=fr-FR&page=1`
      ),
    ])
      .then(([movieInformations, movieVideo, moviesSimilar]) => ({
        movieInformations: movieInformations.data,
        movieVideo: movieVideo.data.results,
        moviesSimilar: moviesSimilar.data.results,
      }))
      .then(({ movieInformations, movieVideo, moviesSimilar }) => {
        console.log(movieInformations);
        console.log(movieVideo);
        console.log(moviesSimilar);

        // merge pages
        const allInformationsMovie = {
          informations: movieInformations,
          video: movieVideo,
          similar: moviesSimilar,
        };

        const moviesDetails = apiMapDataDetails(allInformationsMovie, type);

        console.log(moviesDetails);
        this.setState((prevState) => ({
          movie: moviesDetails,
        }));
      });
  }

  /******
   * EVENT CLOSE PANEL DETAILS
   ******/
  closePanel = () => {
    this.setState({ canPlayVideo: false });
    this.props.toggleDetailsPanel();
  };

  /******
   * HOOK
   ******/
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
            <div id="bg-blur" className={showStatus} onClick={this.closePanel}>
              <div
                id="movie-details"
                className={showStatus}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="content-movie-details">
                  <CloseIcon className="close-btn" onClick={this.closePanel} />

                  <VideoPlayer
                    url={this.state.movie.video_url}
                    background_image={this.state.movie.background_image}
                    canPlayVideo={this.state.canPlayVideo}
                  />

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
                    {this.state.movie.type === "movie" ? (
                      <div className="list-details">
                        <p className="title">Détails</p>
                        <div className="list">
                          <div className="col-label">
                            <span>Durée :</span>
                            <span>Date de sortie :</span>
                            <span>Production :</span>
                            <span>Budget :</span>
                          </div>
                          <div className="col-value">
                            <span>{this.state.movie.runtime}</span>
                            <span>{this.state.movie.date}</span>
                            
                            <span>
                              {this.state.movie.production_companie.name}
                            </span>
                            <span>{this.state.movie.budget}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="list-details">
                        <p className="title">Détails</p>
                        <div className="list">
                          <div className="col-label">
                            <span>Durée d'un épisode :</span>
                            <span>Nombre de saisons :</span>
                            <span>Saison la plus récente :</span>
                            <span>Production :</span>
                            
                          </div>
                          <div className="col-value">
                            <span>{this.state.movie.runtime}</span>
                            <span>{this.state.movie.number_of_seasons}</span>
                            <span>{this.state.movie.date}</span>
                            <span>
                              {this.state.movie.production_companie.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
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
