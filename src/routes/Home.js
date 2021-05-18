import React, { Component } from "react";
import { MoviesSlider, ListMovies, VideoHeader } from "../components";
import apiMovie, { apiMapData } from "../conf/api.movie";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      headerMovie: {},
      headerImage: null,
      searchMovies: [],
      popularMovies: null,
      popular: null,
      genres: {
        movies: [
          {
            name: "Comédie",
            orderOfDisplay: 3,
          },
          {
            name: "Science-Fiction",
            orderOfDisplay: 1,
          },
          {
            name: "Musique",
            orderOfDisplay: 10,
          },
          {
            name: "Horreur",
            orderOfDisplay: 7,
          },
          {
            name: "Thriller",
            orderOfDisplay: 6,
          },
          {
            name: "Documentaire",
            orderOfDisplay: 12,
          },
        ],
        series: [
          {
            name: "Action & Adventure",
            orderOfDisplay: 4,
          },
          {
            name: "Crime",
            orderOfDisplay: 2,
          },
          {
            name: "Drame",
            orderOfDisplay: 8,
          },
          {
            name: "Mystère",
            orderOfDisplay: 4,
          },
          {
            name: "War & Politics",
            orderOfDisplay: 11,
          },
          {
            name: "Comédie",
            orderOfDisplay: 9,
          },
        ],
      },
      loaded: false,
      selectedMovie: undefined,
      showDetails: false,
    };
  }

  /******
   * GET DATA FROM API
   ******/
  getHeaderTendanceMovie() {
    apiMovie
      .get("/trending/all/week?language=fr-FR&page=1")
      .then((movies) => movies.data.results)
      .then((movies) => {
        this.setState({
          headerMovie: movies[0],
          headerImage: movies[0].backdrop_path,
        });
      });
  }

  getTendances() {
    apiMovie
      .get("/trending/all/week?language=fr-FR&page=1")
      .then((movies) => movies.data.results)
      .then((movies) => {
        // this.setState({
        //   headerMovie: movies[0],
        //   headerImage: movies[0].backdrop_path,
        // });
      });
  }

  getPopulars() {
    Promise.all([
      apiMovie.get("/movie/top_rated?language=fr-FR&page=1"),
      apiMovie.get("/movie/top_rated?language=fr-FR&page=2"),
      apiMovie.get("/tv/popular?language=fr-FR&page=1"),
      apiMovie.get("/tv/popular?language=fr-FR&page=2"),
    ])
      .then(([newMovies1, newMovies2, newTv1, newTv2]) => ({
        newMovies1: newMovies1.data.results,
        newMovies2: newMovies2.data.results,
        newTv1: newTv1.data.results,
        newTv2: newTv2.data.results,
      }))
      .then(({ newMovies1, newMovies2, newTv1, newTv2 }) => {
        // merge all pages
        const allPagesMovies = [...newMovies1, ...newMovies2];

        const allPagesTv = [...newTv1, ...newTv2];
        // set array popular movies
        const allMovies = allPagesMovies.map((m) => apiMapData(m, "movie"));
        const allSeries = allPagesTv.map((m) => apiMapData(m, "tv"));

        const allItems = [...allMovies, ...allSeries];

        // Sort array
        allItems.sort((a, b) =>
          a.note > b.note ? 1 : b.note > a.note ? -1 : 0
        );

        this.setState({
          popular: allItems,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getPopularMovies() {
    Promise.all([
      apiMovie.get("/trending/all/week?language=fr-FR&page=1"),
      apiMovie.get("/trending/all/week?language=fr-FR&page=2"),
      apiMovie.get("/trending/all/week?language=fr-FR&page=3"),
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
        const popularMoviesDetails = allPages.map((m) => apiMapData(m));

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
        console.log(genreMovies);
        // get all genre with ids
        const genreMoviesDetails = [];
        let idListMovie = 0;
        genreMovies.map((item, index) => {
          if (
            this.state.genres.movies.filter((g) => g.name === item.name)
              .length > 0
          ) {

            let indexOfItem = this.state.genres.movies.map(e => e.name).indexOf(item.name);
            let orderOfDisplay = this.state.genres.movies[indexOfItem].orderOfDisplay;
            genreMoviesDetails.push({
              name: item.name,
              id: item.id,
              list_id: idListMovie,
              movies: null,
                orderOfDisplay: orderOfDisplay,
            type: "Films"

            });

            idListMovie++;
          }
        });

        this.setState((prevState) => {
          let genres = Object.assign({}, prevState.genres);
          genres.movies = genreMoviesDetails;
          return { genres };
        });

        // get all movies for all genres
        const allCategoriesMovies = [];

        this.state.genres.movies.map((item, index) => {
          Promise.all([
            apiMovie.get(
              "/discover/movie?language=fr-FR&include_adult=false&with_genres=" +
                item.id +
                "&page=1"
            ),
            apiMovie.get(
              "/discover/movie?language=fr-FR&include_adult=false&with_genres=" +
                item.id +
                "&page=2"
            ),
            apiMovie.get(
              "/discover/movie?language=fr-FR&include_adult=false&with_genres=" +
                item.id +
                "&page=3"
            ),
            apiMovie.get(
              "/discover/movie?language=fr-FR&include_adult=false&with_genres=" +
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
              const moviesDetails = allPages.map((m) => apiMapData(m));

              // 1. Make a shallow copy of the items
              let items = [...this.state.genres.movies];
              // 2. Make a shallow copy of the item you want to mutate
              let item = { ...items[index] };
              // 3. Replace the property you're intested in
              item.movies = [...moviesDetails];
              // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
              items[index] = item;

              // 5. Set the state to our new copy
              this.setState((prevState) => {
                let genres = Object.assign({}, prevState.genres); // creating copy of state variable jasper
                genres.movies = items; // update the name property, assign a new value
                return { genres }; // return new object jasper object
              });
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getGenresSeries() {
    apiMovie
      .get("/genre/tv/list?language=fr-FR")
      .then((genreSeries) => genreSeries.data.genres)
      .then((genreSeries) => {
        console.log(genreSeries);
        // get all genre with ids
        const genreSeriesDetails = [];
        let idListMovie = 0;
        genreSeries.map((item, index) => {
            if (
                this.state.genres.series.filter((g) => g.name === item.name)
                  .length > 0
              ) {
                let indexOfItem = this.state.genres.series.map(e => e.name).indexOf(item.name);
                let orderOfDisplay = this.state.genres.series[indexOfItem].orderOfDisplay;
            genreSeriesDetails.push({
              name: item.name,
              id: item.id,
              list_id: idListMovie,
              movies: null,
            orderOfDisplay: orderOfDisplay,
            type: "Séries"

            });

            idListMovie++;
          }
        });

        this.setState((prevState) => {
          let genres = Object.assign({}, prevState.genres);
          genres.series = genreSeriesDetails;
          return { genres };
        });

        // get all movies for all genres
        const allCategoriesSeries = [];

        this.state.genres.series.map((item, index) => {
          Promise.all([
            apiMovie.get(
              "/discover/tv?language=fr-FR&include_adult=false&with_genres=" +
                item.id +
                "&page=1"
            ),
            apiMovie.get(
              "/discover/tv?language=fr-FR&include_adult=false&with_genres=" +
                item.id +
                "&page=2"
            ),
            apiMovie.get(
              "/discover/tv?language=fr-FR&include_adult=false&with_genres=" +
                item.id +
                "&page=3"
            ),
            apiMovie.get(
              "/discover/tv?language=fr-FR&include_adult=false&with_genres=" +
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
              const moviesDetails = allPages.map((m) => apiMapData(m, "tv"));

              // 1. Make a shallow copy of the items
              let items = [...this.state.genres.series];
              // 2. Make a shallow copy of the item you want to mutate
              let item = { ...items[index] };
              // 3. Replace the property you're intested in
              item.movies = [...moviesDetails];
              // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
              items[index] = item;

              // 5. Set the state to our new copy
              this.setState((prevState) => {
                let genres = Object.assign({}, prevState.genres); // creating copy of state variable jasper
                genres.series = items; // update the name property, assign a new value
                return { genres }; // return new object jasper object
              });
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
    this.getTendances();
    this.getPopulars();
    this.getPopularMovies();
    this.getGenresMovies();
    this.getGenresSeries();
    this.setState({
      loaded: true,
    });
  }

  render() {
    let mixedArray = [...this.state.genres.movies, ...this.state.genres.series];

    mixedArray.sort((a, b) =>
    a.orderOfDisplay > b.orderOfDisplay ? 1 : b.orderOfDisplay > a.orderOfDisplay ? -1 : 0
  );

  
    // SLIDERS FOR EACH GENRE MOVIES
    const listCategoryMoviesSlider = mixedArray.map(
      (category, index) => (
        <MoviesSlider
          key={index}
          loaded={this.state.loaded}
          category={category.type + " " + category.name}
          movies={category.movies}
          showLinkSeeAll={true}
          updateSelectedMovie={this.props.updateSelectedMovie}
          toggleDetailsPanel={this.props.toggleDetailsPanel}
        />
      )
    );

    return (
      <>
        {!this.props.search ? (
          <>
            <VideoHeader
              movie={this.state.headerMovie}
              imageMovie={this.state.headerImage}
              updateSelectedMovie={this.props.updateSelectedMovie}
              toggleDetailsPanel={this.props.toggleDetailsPanel}
              showDetails={this.state.showDetails}
            />

            <MoviesSlider
              key={900}
              loaded={this.state.loaded}
              category="En tendance"
              movies={this.state.popularMovies}
              showLinkSeeAll={false}
              updateSelectedMovie={this.props.updateSelectedMovie}
              toggleDetailsPanel={this.props.toggleDetailsPanel}
            />

            <MoviesSlider
              key={901}
              loaded={this.state.loaded}
              category="Les incontournables"
              movies={this.state.popular}
              showLinkSeeAll={false}
              updateSelectedMovie={this.props.updateSelectedMovie}
              toggleDetailsPanel={this.props.toggleDetailsPanel}
            />

            {listCategoryMoviesSlider}
          </>
        ) : (
          <ListMovies
            movies={this.props.searchMovies}
            updateSelectedMovie={this.props.updateSelectedMovie}
            toggleDetailsPanel={this.props.toggleDetailsPanel}
          />
        )}
      </>
    );
  }
}

export default Home;
