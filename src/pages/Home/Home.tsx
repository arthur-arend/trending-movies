import { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card.component";
import { useMovieListStore } from "../../store/movie-list.store";
import { useMoviesController } from "./controllers/home.controller";

export const Home = () => {
  const [search, setSearch] = useState("");
  const { movies } = useMovieListStore();
  const { getTrendingMovies, getMoviesByName } = useMoviesController();

  useEffect(() => {
    if (movies.length === 0) {
      getTrendingMovies();
    }
  }, [getTrendingMovies, movies.length]);

  const handleSearchMovies = () => {
    getMoviesByName(search);
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
      {movies.length > 0 ? (
        movies.map((movie) => <Card key={movie.id} movie={movie} />)
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
