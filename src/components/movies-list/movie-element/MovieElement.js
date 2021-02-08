import React, { Component } from "react";
import image1 from './images/1.jpg';
import "./MovieElement.scss";


class MoviesList extends Component {

  render() {
    console.log("./images/" + this.props.movie.img);
    return (
      <div className="movie-element">
        <img src="https://fr.web.img2.acsta.net/medias/04/97/17/049717_af.jpg" />
      </div>
    );
  }
}

export default MoviesList;
