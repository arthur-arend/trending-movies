import { useEffect, useState } from "react";
import "./App.css";
import { Card } from "./components/Card/Card.component";
import { getTrendingMovies, searchMovies } from "./services/movies.service";

function App() {
  const [movies, setMovies] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getTrendingMovies().then((movies) => {
      setMovies(movies);
    });
  }, []);

  const handleSearchMovies = () => {
    searchMovies(search).then((movies) => {
      setMovies(movies);
    });
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => handleSearchMovies()}>Search</button>
      {movies.map((movie) => (
        <Card key={movie.id} movie={movie} />
      ))}
    </>
  );
}

export default App;
