import { Card } from "../../components/Card/Card.component";
import { SearchBar } from "../../components/SearchBar/SearchBar.component";
import { useMoviesController } from "../../controllers/movies.controller";
import { useMovieListStore } from "../../store/movie-list.store";

export const SearchPage = () => {
  const { moviesByName } = useMovieListStore();
  const { getMoviesByName } = useMoviesController();

  const handleSearchMovies = async (query: string) => {
    await getMoviesByName(query);
  };

  return (
    <>
      <SearchBar onSearch={handleSearchMovies} />
      {moviesByName.length > 0 ? (
        moviesByName.map((movie) => <Card key={movie.id} movie={movie} />)
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
