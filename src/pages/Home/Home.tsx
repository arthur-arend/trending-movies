import { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card.component";
import {
  getMoviesByName,
  getTrendingMovies,
} from "../../services/movies.service";

import type { IMovie } from "../../Model/IMovie";

export const Home = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getTrendingMovies().then((movies) => {
      setMovies(movies);
    });
  }, []);

  const handleSearchMovies = () => {
    getMoviesByName(search).then((movies) => {
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
      {movies.length > 0 ? (
        movies.map((movie) => <Card key={movie.id} movie={movie} />)
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
