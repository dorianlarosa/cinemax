import React from "react";
import "./MovieLoader.scss";
import { ReactComponent as DetailsIcon } from "../utils/details-icon.svg";


const _loaded = {};

class ImageLoader extends React.Component {
  //initial state: image loaded stage
  state = {
    loaded: _loaded[this.props.src],
  };

  //define our loading and loaded image classes
  static defaultProps = {
    className: "",
    loadingClassName: "img-loading",
    loadedClassName: "img-loaded",
  };

  //image onLoad handler to update state to loaded
  onLoad = () => {
    _loaded[this.props.src] = true;
    this.setState(() => ({ loaded: true }));
  };

  render() {
    let { className, loadedClassName, loadingClassName, ...props } = this.props;

    className = `${className} ${
      this.state.loaded ? loadedClassName : loadingClassName
    }`;

    return (
      <div className="movie-element" className={className}>
        <div className="movie-element__container-image">
          <div className="container-icon">
            <div className="content-icon">
              <DetailsIcon />
            </div>
          </div>
          <img src={this.props.img} onLoad={this.onLoad} />
        </div>
        <div className="movie-element__infos">
          <span className="info-1">{this.props.movie.title}</span>
          <span className="info-2">{this.props.movie.date}</span>
        </div>
      </div>
    );
  }
}

export default ImageLoader;
