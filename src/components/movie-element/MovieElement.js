import React, { Component } from "react";
import "./MovieElement.scss";
import { ReactComponent as DetailsIcon } from "./utils/details-icon.svg";
import LazyLoad from "react-lazyload";

const _loaded = {};

class MoviesElement extends Component {
  //initial state: image loaded stage
  state = {
    loaded: _loaded[this.props.movie.img],
  };

  //define our loading and loaded image classes
  static defaultProps = {
    className: "",
    loadingClassName: "img-loading",
    loadedClassName: "img-loaded",
  };

  //image onLoad handler to update state to loaded
  onLoad = () => {
    _loaded[this.props.movie.img] = true;
    this.setState(() => ({ loaded: true }));
  };

  click = () => {
    this.props.updateSelectedMovie(this.props.movie.id);
    this.props.toggleDetailsPanel();
  }

  render() {
    let { className, loadedClassName, loadingClassName, ...props } = this.props;

    className = `${className} ${
      this.state.loaded ? loadedClassName : loadingClassName
    }`;

    return (
      <div
        className={"movie-element " + className}
        onClick={this.click}
      >
        {/* <p className="movie-element__title">{this.props.movie.title}</p> */}
        <div className="movie-element__container-image">
          <div className="container-icon">
            <div className="content-icon">
              <DetailsIcon />
            </div>
          </div>
          {this.props.movie.img === 'init' ? (
              <LazyLoad once offset={-100}>
                <img onLoad={this.onLoad} src={this.props.movie.img} />
              </LazyLoad>
          ) : (  
              <LazyLoad once offset={-100}>
                <img onLoad={this.onLoad} src={this.props.movie.img} />
              </LazyLoad> 
          )}
   
        </div>
        <div className="movie-element__infos">
          <span className="info-1">{this.props.movie.title}</span>
          <span className="info-2">{this.props.movie.date}</span>
        </div>
      </div>
    );
  }
}

export default MoviesElement;
