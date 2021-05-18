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

const timeConvert = (runtime) => {
  var num = runtime;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return rhours + "h " + rminutes + "m";
};

const numberWithSpaces = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
export default apiMovie;

export const apiMapData = (m, type = "movie") => {
  if (m.poster_path) {
    let typeOfElement = m.media_type ? m.media_type : type;

    if (typeOfElement === "movie") {
      return {
        id: m.id,
        type: "Film",
        img: "https://image.tmdb.org/t/p/w300" + m.poster_path,
        originalImg: "https://image.tmdb.org/t/p/original" + m.poster_path,
        title: m.title,
        note: m.vote_average,
        date: dateToYear(m.release_date),
      };
    } else if (typeOfElement === "tv") {
      return {
        id: m.id,
        type: "Série",
        img: "https://image.tmdb.org/t/p/w300" + m.poster_path,
        originalImg: "https://image.tmdb.org/t/p/original" + m.poster_path,
        title: m.name,
        note: m.vote_average,
        date: dateToYear(m.first_air_date),
      };
    }
  }
};

export const apiMapDataDetails = (m, type = "movie") => {
  let typeOfElement = m.media_type ? m.media_type : type;

  if (typeOfElement === "movie") {
    let urlVideo;

    if (!m.video[0]) {
      urlVideo = null;
    } else if (m.video[0].site === "YouTube") {
      urlVideo = "https://www.youtube.com/watch?v=" + m.video[0].key;
    } else {
      urlVideo = "https://vimeo.com/" + m.video[0].key;
    }

    return {
      id: m.informations.id,
      type: m.typeOfElement,
      img: "https://image.tmdb.org/t/p/w300" + m.informations.poster_path,
      originalImg:
        "https://image.tmdb.org/t/p/original" + m.informations.poster_path,
      background_image:
        "https://image.tmdb.org/t/p/original" + m.informations.backdrop_path,
      title: m.informations.title,
      description: m.informations.overview,
      genres: m.informations.genres
        .map(function (elem) {
          return elem.name;
        })
        .join(" / "),
      date: dateToYear(m.informations.release_date),
      vote: m.informations.vote_average,
      runtime: timeConvert(m.informations.runtime),
      production_companie: {
        name: m.informations.production_companies[0].name,
        logo:
          "https://image.tmdb.org/t/p/w300" +
          m.informations.production_companies[0].logo_path,
      },
      budget:
        numberWithSpaces(m.informations.budget) != "0"
          ? numberWithSpaces(m.informations.budget) + " $"
          : "Non communiqué",
      similar: m.similar,
      video_url: urlVideo,
    };
  } else if (typeOfElement === "tv") {
  }
};
