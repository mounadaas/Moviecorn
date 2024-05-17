import React from "react";

const MoviesInfoItem = ({ watchedmovie, handelDeletwatched }) => {
  return (
    <div>
      {watchedmovie.map((movie) => {
        return (
          <div key={movie.Title} className="filmbox">
            <div className="image">
              <img src={movie.Poster} alt="movie poster" />
            </div>
            <div className="filmboxinfo">
              <h4>{movie.Title}</h4>
              <div className="ratings">
                <span>⭐{movie.imdbRating}</span>
                <span>🌟{movie.rating}</span>
                <span>⏳{movie.Runtime}min</span>
              </div>
            </div>
            <button
              className="btn-close"
              onClick={() => handelDeletwatched(movie.ImdbID)}
            >
              &#x2715;
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default MoviesInfoItem;
