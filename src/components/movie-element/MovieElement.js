import React, { Component } from "react";
import "./MovieElement.scss";
import { ReactComponent as DetailsIcon } from "./utils/details-icon.svg";

class MoviesList extends Component {
  render() {
    return (
      <div className="movie-element">
        {/* <p className="movie-element__title">{this.props.movie.title}</p> */}
        <div className="movie-element__container-image">
          <div className="container-icon">
            <div className="content-icon">
              <DetailsIcon />
            </div>
          </div>
          <img src={this.props.movie.img} />
        </div>
        <div className="movie-element__infos">
          <span className="info-1">{this.props.movie.title}</span>
          <span className="info-2">{this.props.movie.date}</span>
        </div>
      </div>
    );
  }
}

export default MoviesList;
