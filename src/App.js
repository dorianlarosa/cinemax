import React, { Component } from "react";
import { Navbar, MoviesList, MovieDetails } from "./components";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <MoviesList />
        <MovieDetails />
      </div>
    );
  }
}

export default App;
