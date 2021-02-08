import React, { Component } from "react";
import image1 from "./images/1.jpg";
import "./MovieElement.scss";
import { ReactComponent as DetailsIcon } from "./utils/details-icon.svg";

class MoviesList extends Component {
  render() {
    console.log("./images/" + this.props.movie.img);
    return (
      <div className="movie-element">
        <p className="movie-element__title">{this.props.movie.title}</p>
        <div className="movie-element__container-image">
          <div className="container-icon">
            <div className="content-icon">
              <DetailsIcon />
            </div>
          </div>
          <img src="https://fr.web.img2.acsta.net/medias/04/97/17/049717_af.jpg" />
        </div>
        <div className="movie-element__infos">
          <span className="info-1">
            {this.props.movie.year} - {this.props.movie.duree}
          </span>
          <span className="info-2">{this.props.movie.genre}</span>
        </div>
      </div>
    );
  }
}

export default MoviesList;
