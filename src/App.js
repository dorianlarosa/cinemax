import React, { Component } from "react";
import {
  Navbar,
  MoviesSlider,
  MovieDetails,
  ListMovies,
  VideoHeader,
} from "./components";
import apiMovie, { apiMovieMapData } from "./conf/api.movie";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      headerMovie: {},
      searchMovies: [],
      popularMovies: null,
      genreMovies: [
        "Mystère",
        "Animation",
        "Musique",
        "Horreur",
        "Thriller",
        "Western",
      ],
      loaded: false,
    };
  }

  disableTransitionsResizeWindow() {
    let resizeTimer;
    window.addEventListener("resize", () => {
      document.body.classList.add("resize-animation-stopper");
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
      }, 400);
    });
  }

  toggleSearch = () => {
    this.setState((prevState) => ({
      search: !prevState.search,
    }));
  };

  updateSearchMovies = (movies) => {
    this.setState({
      searchMovies: movies,
    });
    console.log(this.state.searchMovies);
  };


  getHeaderTendanceMovie() {
    apiMovie
      .get("/movie/popular?language=fr-FR&page=1")
      .then((movies) => movies.data.results)
      .then((movies) => {
        //console.log(movies);
        this.setState({
          headerMovie: movies[0],
        });
      });
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
        const popularMoviesDetails = allPages.map(apiMovieMapData);

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

              const moviesDetails = allPages.map(apiMovieMapData);

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
    this.disableTransitionsResizeWindow();
    this.getHeaderTendanceMovie();
    this.getPopularMovies();
    this.getGenresMovies();
    this.setState({
      loaded: true,
    });
  }

  render() {
    // console.log(this.state.genreMovies);
    // console.log(this.state.popularMovies);

    const listCategoryMoviesSlider = this.state.genreMovies.map(
      (category, index) => (
        <MoviesSlider
          key={index}
          loaded={this.state.loaded}
          category={"Films " + category.name}
          movies={category.movies}
          showLinkSeeAll={true}
        />
      )
    );

    return (
      <div className="App">
        <Navbar
          toggleSearch={this.toggleSearch}
          search={this.state.search}
          updateSearchMovies={this.updateSearchMovies}
        />
        {!this.state.search ? (
          <>
            <VideoHeader movie={this.state.headerMovie} />

            <MoviesSlider
              key={12}
              loaded={this.state.loaded}
              category="Films en tendance"
              movies={this.state.popularMovies}
              showLinkSeeAll={false}
            />
            {listCategoryMoviesSlider}
          </>
        ) : (
          <ListMovies movies={this.state.searchMovies} />
        )}
      </div>
    );
  }
}

export default App;
