const MoviesList = ({ movies, setSelectedID, selectedID, isopen1 }) => {
  function handelSelectMovie(id) {
    setSelectedID((selectedID) => (id === selectedID ? null : id));
  }
  return (
    <div className="">
      {!isopen1 && (
        <div className="movielist">
          {movies?.map((movie) => {
            return (
              <div
                key={movie.imdbID}
                className="filmbox resume"
                onClick={() => handelSelectMovie(movie.imdbID)}
              >
                <img src={movie.Poster} alt="movie poster" />

                <div className="resumeinfo">
                  <p> {movie.Title}</p>
                  <p>📅{movie.Year}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MoviesList;
