import React, { Component } from "react";
import { MoviesSlider, ListMovies, VideoHeader } from "../components";
import apiMovie, { apiMapData } from "../conf/api.movie";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      headerMovie: {},
      headerImage: null,
      searchMovies: [],
      popularMovies: null,
           
      genres:[
          {
            name: "Action",
            orderOfDisplay: 1,
          },
          {
            name: "Comédie",
            orderOfDisplay: 2,
          },
          {
            name: "Animation",
            orderOfDisplay: 3,
          },{
            name: "Fantastique",
            orderOfDisplay: 4,
          },{
            name: "Science-Fiction",
            orderOfDisplay: 5,
          },{
            name: "Horreur",
            orderOfDisplay: 6,
          },{
            name: "Drame",
            orderOfDisplay: 7,
          },{
            name: "Familial",
            orderOfDisplay: 8,
          },{
            name: "Aventure",
            orderOfDisplay: 9,
          },{
            name: "Musique",
            orderOfDisplay: 10,
          },{
            name: "Romance",
            orderOfDisplay: 11,
          },{
            name: "Guerre",
            orderOfDisplay: 12,
          },{
            name: "Western",
            orderOfDisplay: 13,
          },
        ],
       
      
      loaded: false,
      selectedMovie: undefined
    };
  }

  /******
   * GET DATA FROM API
   ******/
  getHeaderTendanceMovie() {
    apiMovie
      .get("/movie/popular?language=fr-FR&page=1")
      .then((movies) => movies.data.results)
      .then((movies) => {
        this.setState({
          headerMovie: movies[0],
          headerImage: movies[0].backdrop_path,
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
        const popularMoviesDetails = allPages.map((m) => apiMapData(m, "movie"));

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
          if (
            this.state.genres.filter((g) => g.name === item.name)
              .length > 0
          ) {
            let indexOfItem = this.state.genres.map(e => e.name).indexOf(item.name);
            let orderOfDisplay = this.state.genres[indexOfItem].orderOfDisplay;
            genreMoviesDetails.push({
              name: item.name,
              id: item.id,
              list_id: idListMovie,
              orderOfDisplay: orderOfDisplay,

              movies: null,
            });

            idListMovie++;
          }
        });

        this.setState({
          genres: genreMoviesDetails,
        });

        // get all movies for all genres
        const allCategoriesMovies = [];
        this.state.genres.map((item, index) => {
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
              const moviesDetails = allPages.map((m) => apiMapData(m, "movie"));
              
              // 1. Make a shallow copy of the items
              let items = [...this.state.genres];
              // 2. Make a shallow copy of the item you want to mutate
              let item = { ...items[index] };
              // 3. Replace the property you're intested in
              item.movies = [...moviesDetails];
              // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
              items[index] = item;

              // 5. Set the state to our new copy
              this.setState({ genres: items });

            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /******
   * HOOK
   ******/
  componentDidMount() {
    this.getHeaderTendanceMovie();
    this.getPopularMovies();
    this.getGenresMovies();
    this.setState({
      loaded: true,
    });
  }

  render() {

    let mixedArrayGenres = [...this.state.genres];

    mixedArrayGenres.sort((a, b) =>
    a.orderOfDisplay > b.orderOfDisplay ? 1 : b.orderOfDisplay > a.orderOfDisplay ? -1 : 0
  );

    // SLIDERS FOR EACH GENRE MOVIES
    const listCategoryMoviesSlider = mixedArrayGenres.map(
      (category, index) => (
        <MoviesSlider
          key={index}
          loaded={this.state.loaded}
          category={"Films " + category.name}
          movies={category.movies}
          showLinkSeeAll={true}
          updateSelectedMovie={this.updateSelectedMovie}
          toggleDetailsPanel={this.toggleDetailsPanel}
        />
      )
    );

    return (
      <>
        <VideoHeader
          movie={this.state.headerMovie}
          imageMovie={this.state.headerImage}
          updateSelectedMovie={this.props.updateSelectedMovie}
          toggleDetailsPanel={this.props.toggleDetailsPanel}
          showDetails={this.props.showDetails}
        />

        <MoviesSlider
          key={12}
          loaded={this.state.loaded}
          category="Films en tendance"
          movies={this.state.popularMovies}
          showLinkSeeAll={false}
          updateSelectedMovie={this.props.updateSelectedMovie}
          toggleDetailsPanel={this.props.toggleDetailsPanel}
        />
        {listCategoryMoviesSlider}
      </>
    );
  }
}

export default Movies;
