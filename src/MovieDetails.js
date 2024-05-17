import React, { useEffect, useState } from "react";
import "./MovieDetails.css";
import StarRating from "./StarRating";
import Loader from "./Loader";
const key = "646a8f8c";

const MovieDetails = ({
  selectedID,
  setSelectedID,
  handelAddTolist,
  watchedmovie,
  handelcoloseMovieDetail,
}) => {
  const [movie, setMovie] = useState([]);
  const [Isloading, setIsloading] = useState(false);
  const [rating, setRating] = useState("");
  const isWatched = watchedmovie
    .map((movie) => movie.ImdbID)
    .includes(selectedID);
  const watchedUserRating = watchedmovie.find(
    (movie) => movie.ImdbID === selectedID
  )?.rating;
  function addWatchedMovie() {
    const newWatchedMovie = {
      ImdbID: selectedID,
      Poster: movie.Poster,
      Title: movie.Title,
      Year: movie.Year,
      imdbRating: Number(movie.imdbRating),
      Runtime: Number(movie.Runtime.split(" ").at(0)),
      rating,
    };
    handelAddTolist(newWatchedMovie);
    handelcoloseMovieDetail();
  }
  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          handelcoloseMovieDetail();
        }
      }
      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [handelcoloseMovieDetail]
  );

  useEffect(
    function () {
      async function getMovieDetail() {
        setIsloading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&i=${selectedID}`
        );
        const data = await res.json();
        setMovie(data);

        setIsloading(false);
      }
      getMovieDetail();
    },
    [selectedID]
  );
  useEffect(
    function () {
      if (!movie.Title) return;
      document.title = `Movie | ${movie.Title}`;
      return function () {
        document.title = `MovieCorn`;
      };
    },
    [movie.Title]
  );

  return (
    <div className="moveiDetail">
      {Isloading ? (
        <Loader />
      ) : (
        <>
          <header>
            <div className="button">
              <button onClick={handelcoloseMovieDetail}>&larr;</button>
            </div>
            <img src={movie.Poster} alt={movie.Title} />
            <div>
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐</span> {movie.imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={22}
                    rating={rating}
                    setRating={setRating}
                  />
                  {rating > 0 && (
                    <button onClick={addWatchedMovie} className="btn-add">
                      + Add to List
                    </button>
                  )}
                </>
              ) : (
                <p>You rated this movie {watchedUserRating} 🌟</p>
              )}
            </div>

            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by{movie.Director} </p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
