import React, { Component } from "react";
import { Navbar, MoviesList, MovieDetails } from "./components";
import apiMovie from "./conf/api.movie";
import SliderHeader from "./components/slider-header/SliderHeader";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularMovies: [],
      genreMovies: ["Mystère", "Animation", "Musique", "Horreur", "Thriller", "Western"],
      infinite: false,
      loaded: false,
    };
  }

  getPopularMovies() {
    Promise.all([
      apiMovie.get("/movie/popular?language=fr-FR&page=1"),
      apiMovie.get("/movie/popular?language=fr-FR&page=2"),
      apiMovie.get("/movie/popular?language=fr-FR&page=3"),
    ])
      .then(([popularMovies1, popularMovies2, popularMovies3]) => ({
        popularMovies1: popularMovies1.data.results,
        popularMovies2: popularMovies2.data.results,
        popularMovies3: popularMovies3.data.results,
      }))
      .then(({ popularMovies1, popularMovies2, popularMovies3 }) => {

        // merge all pages
        const allPages = [
          ...popularMovies1,
          ...popularMovies2,
          ...popularMovies3,
        ];

        // set array popular movies
        const popularMoviesDetails = allPages.map((m) => ({
          id: m.id,
          img: "https://image.tmdb.org/t/p/w300" + m.poster_path,
          title: m.title,
          date: m.release_date,
          vote_average: m.vote_average,
          description: m.overview,
        }));

        this.setState({
          popularMovies: popularMoviesDetails,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getGenresMovies() {
    apiMovie
      .get("/genre/movie/list?language=fr-FR")
      .then((genreMovies) => genreMovies.data.genres)
      .then((genreMovies) => {

        // get all genre with ids
        const genreMoviesDetails = [];
        let idListMovie = 0;
        genreMovies.map((item, index) => {
        console.log(item.name);

          if (this.state.genreMovies.includes(item.name)) {
            
            genreMoviesDetails.push({
              name: item.name,
              id: item.id,
              list_id: idListMovie,
              movies: null,
            });

            idListMovie++;
          }
        });

        this.setState({
          genreMovies: genreMoviesDetails,
        });

        // get all movies for all genres
        const allCategoriesMovies = [];
        this.state.genreMovies.map((item, index) => {
          Promise.all([
            apiMovie.get(
              "/discover/movie?language=fr-FR&with_genres=" +
                item.id +
                "&page=1"
            ),
            apiMovie.get(
              "/discover/movie?language=fr-FR&with_genres=" +
                item.id +
                "&page=2"
            ),
            apiMovie.get(
              "/discover/movie?language=fr-FR&with_genres=" +
                item.id +
                "&page=3"
            ),
            apiMovie.get(
              "/discover/movie?language=fr-FR&with_genres=" +
                item.id +
                "&page=4"
            ),
          ])

            .then(([page1, page2, page3, page4]) => ({
              page1: page1.data.results,
              page2: page2.data.results,
              page3: page3.data.results,
              page4: page4.data.results,
            }))
            .then(({ page1, page2, page3, page4 }) => {

              // merge pages
              const allPages = [...page1, ...page2, ...page3, ...page4];

              const moviesDetails = allPages.map((m) => ({
                id: m.id,
                img: "https://image.tmdb.org/t/p/w300" + m.poster_path,
                title: m.title,
                date: m.release_date,
                vote_average: m.vote_average,
                description: m.overview,
              }));

              // 1. Make a shallow copy of the items
              let items = [...this.state.genreMovies];
              // 2. Make a shallow copy of the item you want to mutate
              let item = { ...items[index] };
              // 3. Replace the property you're intested in
              item.movies = [...moviesDetails];
              // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
              items[index] = item;
              // 5. Set the state to our new copy
              this.setState({ genreMovies: items });
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getPopularMovies();
    this.getGenresMovies();
    this.setState({
      loaded: true,
    });
  }

  render() {
    const listCategoryMoviesSlider = this.state.genreMovies.map((item, index) => (
      <MoviesList
        key={index}
        loaded={this.state.loaded}
        category={"Films " + item.name}
        movies={item.movies}
        showLinkSeeAll={true}
      />
    ));
    return (
      <div className="App">
        <Navbar />
        <SliderHeader />
        <MoviesList
          loaded={this.state.loaded}
          category="Films en tendance"
          movies={this.state.popularMovies}
          showLinkSeeAll={false}
        />

        {listCategoryMoviesSlider}

      </div>
    );
  }
}

export default App;
