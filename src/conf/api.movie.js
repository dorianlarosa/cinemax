import * as axios from "axios";

const apiMovie = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

apiMovie.interceptors.request.use((req) => {
  req.headers["Authorization"] =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTNjNTYxZTk1MGE5MmUwYWQzYTU4YTA0MTQzYjdjNyIsInN1YiI6IjYwMWVmYzQ3N2Y0ZjIxMDAzZmZlOThiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OpV-S8O58D6GG3Sok0ZKeW2cSWOmykwMsubDlyKRqPA";
  return req;
});

const dateToYear = (date) => {
  const dateObject = new Date(date);
  return dateObject.getFullYear().toString();
};

export default apiMovie;

export const apiMovieMapData = (m) => {
  if (m.poster_path != null) {
    return {
      id: m.id,
      img: "https://image.tmdb.org/t/p/w300" + m.poster_path,
      title: m.title,
      date: dateToYear(m.release_date),
      vote_average: m.vote_average,
      description: m.overview,
    };
  }
};
