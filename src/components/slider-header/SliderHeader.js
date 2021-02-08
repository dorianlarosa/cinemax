import React, { Component } from "react";
import "./SliderHeader.scss";

class SliderHeader extends Component {
  render() {
    return (
      <div id="slider-header">
        <div className="content container">
          <p className="title-movie">NIGHTMARE ISLAND</p>
          <p className="description-movie">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
            culpa sapiente soluta vitae illo consequuntur debitis voluptatum
            impedit odit. 
          </p>
          <button className="btn btn__transparent">En savoir plus</button>
        </div>
      </div>
    );
  }
}

export default SliderHeader;
