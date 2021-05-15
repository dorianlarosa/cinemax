import React, { Component } from "react";
import "./MoviesSlider.scss";
import Slider from "react-slick";
import Loading from "../utils/Loading";

import MovieElement from "../movie-element/MovieElement";

function LinkSeeAll(props) {
  return <span className="link-see-all">Voir tout</span>;
}

class MoviesSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infinite: false,
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
      lazyLoad: true,
      slidesToScroll: 6,
      initialSlide: 0,
      draggable: false,
      afterChange: () => {
        this.setState({ infinite: true });
      },
      responsive: [
        {
          breakpoint: 2000,
          settings: {
            slidesToShow: 7,
            slidesToScroll: 7,
          },
        },
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 7,
            slidesToScroll: 7,
          },
        },
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    };

    const displayMovieElement = (element) => {
      if (element != undefined) {
        return (
          <MovieElement
            key={element.id}
            movie={element}
            updateSelectedMovie={this.props.updateSelectedMovie}
            toggleDetailsPanel={this.props.toggleDetailsPanel}
          />
        );
      }
    };

    const displayInitLoadMovies = () => {
      return (
        <>
          <MovieElement key={1} movie="init" />
          <MovieElement key={2} movie="init" />
          <MovieElement key={3} movie="init" />
          <MovieElement key={4} movie="init" />
          <MovieElement key={5} movie="init" />
          <MovieElement key={6} movie="init" />
          <MovieElement key={7} movie="init" />
          <MovieElement key={8} movie="init" />
          <MovieElement key={9} movie="init" />
        </>
      );
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
                  {this.props.movies.map((movie) => displayMovieElement(movie))}
                </Slider>
              ) : (
                <Slider {...settings}>{displayInitLoadMovies()}</Slider>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MoviesSlider;
