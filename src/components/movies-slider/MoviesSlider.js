/******
 * MOVIES SLIDERS
 ******/

import React, { Component } from "react";
import "./MoviesSlider.scss";

import Slider from "react-slick";
import MovieElement from "../movie-element/MovieElement";

function LinkSeeAll(props) {
  return <span className="link-see-all">Voir tout</span>;
}

class MoviesSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        lazyLoad: true,
        slidesToScroll: 6,
        initialSlide: 0,
        draggable: false,
        afterChange: () => {
          this.setState(prevState => {
            let settings = Object.assign({}, prevState.settings);  
            settings.infinite = true;                     
            return { settings };
          })
        },
        responsive: [
          {
            breakpoint: 2000,
            settings: {
              slidesToShow: 8,
              slidesToScroll: 8,
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
              slidesToShow: 5,
              slidesToScroll: 5,
            },
          },
          {
            breakpoint: 1000,
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
      },
    };
  }

  displayMovieElement = (element) => {
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

  render() {
    const showLinkSeeAll = this.props.showLinkSeeAll;
    let button;
    if (showLinkSeeAll) {
      button = <LinkSeeAll />;
    } else {
      button = "";
    }

    return (
      <div className="movies-list">
        <div className="container">
          {this.props.loaded && this.props.movies != null ? (
            <>
              <div className="header-list">
                <h2 className="title-category">{this.props.category}</h2>
                {button}
              </div>

              <div className="slider">
                <Slider {...this.state.settings}>
                  {this.props.movies.map((movie) =>
                    this.displayMovieElement(movie)
                  )}
                </Slider>
              </div>
            </>
          ) : (
            <>
              <div className="header-list">
                <h2 className="title-category">Chargement...</h2>
                {button}
              </div>

              <div className="slider">
                <Slider {...this.state.settings}>
                  <MovieElement key={1} movie="init" />
                  <MovieElement key={2} movie="init" />
                  <MovieElement key={3} movie="init" />
                  <MovieElement key={4} movie="init" />
                  <MovieElement key={5} movie="init" />
                  <MovieElement key={6} movie="init" />
                  <MovieElement key={7} movie="init" />
                  <MovieElement key={8} movie="init" />
                  <MovieElement key={9} movie="init" />
                </Slider>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default MoviesSlider;
