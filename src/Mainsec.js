import MoviesList from "./MoviesList";
import MoviesInfo from "./MoviesInfo";
import ErrorMessage from "./ErrorMessage";
import "./Mainsec.css";
import Loader from "./Loader";
import MovieDetails from "./MovieDetails";
import { useState } from "react";

const Mainsec = ({
  watchedmovie,
  movies,
  isLoading,
  error,
  selectedID,
  setSelectedID,
  handelAddTolist,
  handelDeletwatched,
  handelcoloseMovieDetail,
}) => {
  const [isopen1, setIsopen1] = useState(false);
  const [isopen2, setIsopen2] = useState(false);

  return (
    <div className="boxes">
      <div className="box">
        <div className="btn">
          <button
            value={isopen1}
            onClick={() => setIsopen1((isopen1) => !isopen1)}
          >
            {isopen1 ? "+" : "-"}
          </button>
        </div>

        {isLoading && <Loader />}
        {!isLoading && !error && (
          <MoviesList
            movies={movies}
            selectedID={selectedID}
            setSelectedID={setSelectedID}
            isopen1={isopen1}
          />
        )}
        {error && <ErrorMessage message={error} />}
      </div>

      <div className="box">
        <div className="btn">
          <button
            value={isopen2}
            onClick={() => setIsopen2((isopen2) => !isopen2)}
          >
            {isopen2 ? "+" : "-"}
          </button>
        </div>
        {selectedID ? (
          <MovieDetails
            selectedID={selectedID}
            setSelectedID={setSelectedID}
            handelAddTolist={handelAddTolist}
            watchedmovie={watchedmovie}
            handelcoloseMovieDetail={handelcoloseMovieDetail}
          />
        ) : (
          <MoviesInfo
            watchedmovie={watchedmovie}
            isopen2={isopen2}
            handelDeletwatched={handelDeletwatched}
          />
        )}
      </div>
    </div>
  );
};

export default Mainsec;
