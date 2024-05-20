import { useEffect, useState } from "react";
import "./App.css";
import Mainsec from "./Mainsec";
import Navbar from "./Navbar";

const key = "646a8f8c";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedID, setSelectedID] = useState("");
  //const [watchedmovie, setWatchedmovie] = useState([])

  const [watchedmovie, setWatchedmovie] = useState(function () {
    const storedValue = localStorage.getItem("watched");

    return JSON.parse(storedValue);
  });

  function handelAddTolist(newmovie) {
    setWatchedmovie((watchedmovie) => [...watchedmovie, newmovie]);
  }
  function handelDeletwatched(id) {
    setWatchedmovie((watchedmovie) =>
      watchedmovie.filter((movie) => movie.ImdbID !== id)
    );
  }
  function handelcoloseMovieDetail() {
    setSelectedID(null);
  }
  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watchedmovie));
    },
    [watchedmovie]
  );
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("Something went wrong with fetching");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.message !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      handelcoloseMovieDetail();
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <div className="App">
      <Navbar movies={movies} query={query} setQuery={setQuery} />
      <Mainsec
        watchedmovie={watchedmovie}
        movies={movies}
        isLoading={isLoading}
        error={error}
        selectedID={selectedID}
        setSelectedID={setSelectedID}
        handelAddTolist={handelAddTolist}
        handelDeletwatched={handelDeletwatched}
        handelcoloseMovieDetail={handelcoloseMovieDetail}
      />
    </div>
  );
}

export default App;
