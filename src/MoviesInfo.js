import MoviesInfoItem from "./MoviesInfoItem";

const MoviesInfo = ({ watchedmovie, isopen2, handelDeletwatched }) => {
  const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => (acc + cur) / arr.length, 0);

  const avgImdbRating = average(watchedmovie.map((movie) => movie.imdbRating));
  const avgUserRating = average(watchedmovie.map((movie) => movie.rating));
  const avgUserRuntme = average(watchedmovie.map((movie) => movie.Runtime));

  return (
    <div className="">
      {!isopen2 && (
        <div className="movielist">
          <div className="totalinfo">
            <h4>MOVIES YOU WATCHED</h4>
            <div>
              <p>#️⃣ {watchedmovie.length} movies</p>
              <p>⭐{avgImdbRating.toFixed(2)} </p>
              <p>🌟{avgUserRating.toFixed(2)} </p>
              <p>⏳{avgUserRuntme.toFixed(2)}min</p>
            </div>
          </div>

          <MoviesInfoItem
            watchedmovie={watchedmovie}
            handelDeletwatched={handelDeletwatched}
          />
        </div>
      )}
    </div>
  );
};

export default MoviesInfo;
