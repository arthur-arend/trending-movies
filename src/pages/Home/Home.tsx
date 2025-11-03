import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Card } from "../../components/Card/Card.component";
import { SearchBar } from "../../components/SearchBar/SearchBar.component";
import { useMoviesController } from "../../controllers/movies.controller";
import { useMovieListStore } from "../../store/movie-list.store";

export const Home = () => {
  const { moviesTrending } = useMovieListStore();
  const { getTrendingMovies, getMoviesByName } = useMoviesController();

  const navigate = useNavigate();

  useEffect(() => {
    if (moviesTrending.length === 0) {
      getTrendingMovies();
    }
  }, [getTrendingMovies, moviesTrending.length]);

  const handleSearchMovies = async (query: string) => {
    await getMoviesByName(query);
    navigate("/search");
  };

  return (
    <>
      <SearchBar onSearch={handleSearchMovies} />
      {moviesTrending.length > 0 ? (
        moviesTrending.map((movie) => <Card key={movie.id} movie={movie} />)
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
