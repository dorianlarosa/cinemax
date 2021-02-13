import React, { Component } from "react";
import { Navbar, MoviesList, MovieDetails } from "./components";
import apiMovie from "./conf/api.movie";
import SliderHeader from "./components/slider-header/SliderHeader";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import dataMovies from "./data";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularMovies: [],
      genreMovies: ["Comédie", "Animation", "Familial", "Horreur"],
      infinite: false,
    };
  }

  componentDidMount() {
    Promise.all([
      apiMovie.get("/movie/popular?language=fr-FR"),
      apiMovie.get("/genre/movie/list?language=fr-FR"),
    ])
      .then(([popularMovies, genreMovies]) => ({
        popularMovies: popularMovies.data.results,
        genreMovies: genreMovies.data.genres,
      }))
      .then(({ popularMovies, genreMovies }) => {
        // set array popular movies
        const popularMoviesDetails = popularMovies.map((m) => ({
          id: m.id,
          img: "https://image.tmdb.org/t/p/w500" + m.poster_path,
          title: m.title,
          year: m.release_date,
          vote_average: m.vote_average,
          description: m.overview,
        }));

        // set new array genre with ids
        const genreMoviesDetails = [];
        genreMovies.map((item, index) => {
          if (this.state.genreMovies.includes(item.name)) {
            genreMoviesDetails.push({
              name: item.name,
              id: item.id,
            });
          }
        });

        this.setState({
          popularMovies: popularMoviesDetails,
          genreMovies: genreMoviesDetails,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <SliderHeader />
        <MoviesList
          category="Films en tendance"
          movies={this.state.popularMovies}
          showLinkSeeAll={false}
        />

        {/* 
        <MoviesList
          category="Series en tendance"
          movies={this.state.movies}
          showLinkSeeAll={false}
        />
        <MoviesList
          category="Films comedie"
          movies={this.state.movies}
          showLinkSeeAll={true}
        />
        <MoviesList
          category="Films d'horreur"
          movies={this.state.movies}
          showLinkSeeAll={true}
        />
        <MovieDetails /> */}
      </div>
    );
  }
}

export default App;
