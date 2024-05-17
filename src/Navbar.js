import "./Navbar.css";

const Navbar = ({ movies, query, setQuery }) => {
  return (
    <nav>
      <div className="logo">🍿MovieCorn</div>
      <div className="input">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div>
        <p>Found {movies.length} results</p>
      </div>
    </nav>
  );
};

export default Navbar;
