import React, { Component } from "react";
import { Navbar, MoviesList, MovieDetails } from "./components";
import SliderHeader from "./components/slider-header/SliderHeader";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <SliderHeader />
        <MoviesList />
        <MovieDetails />
      </div>
    );
  }
}

export default App;
