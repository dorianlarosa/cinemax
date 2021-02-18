import React, { Component } from "react";
import "./MoviesList.scss";
import Slider from "react-slick";
import Loading from "./utils/Loading";

import MovieElement from "./movie-element/MovieElement";

function LinkSeeAll(props) {
  return <span className="link-see-all">Voir tout</span>;
}

class MoviesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infinite: false
    };
  }

  render() {
    const showLinkSeeAll = this.props.showLinkSeeAll;
    let button;
    if (showLinkSeeAll) {
      button = <LinkSeeAll />;
    } else {
      button = "";
    }

    const settings = {
      dots: false,
      infinite: this.state.infinite,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 6,
      draggable: false,
      afterChange: () => this.setState({ infinite: true }),
    };

    return (
      <>
        <div className="movies-list">
          <div className="container">
            <div className="header-list">
              <h2 className="title-category">{this.props.category} :</h2>
              {button}
            </div>

            <div className="slider">
              
              {this.props.loaded && this.props.movies != null ? (
                <Slider {...settings}>
                  {this.props.movies.map((movie) => (
                    <MovieElement key={movie.id} movie={movie} />
                  ))}
                </Slider>
              ) : (
                <Loading />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MoviesList;
