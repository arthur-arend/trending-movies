import { useCallback } from "react";
import type { IMovie } from "../../../Model/IMovie";
import {
  getMoviesByNameService,
  getTrendingMoviesService,
} from "../../../services/movies.service";
import { useMovieListStore } from "../../../store/movie-list.store";

const sortMoviesByVoteAverage = (movies: IMovie[]): IMovie[] => {
  return [...movies].sort((a, b) => b.vote_average - a.vote_average);
};

export function useMoviesController() {
  const { setMovies } = useMovieListStore();

  const getTrendingMovies = useCallback(async () => {
    try {
      const moviesResponse = await getTrendingMoviesService();
      const sortedMovies = sortMoviesByVoteAverage(moviesResponse);
      setMovies(sortedMovies);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      setMovies([]);
    }
  }, [setMovies]);

  const getMoviesByName = useCallback(
    async (query: string) => {
      try {
        const moviesResponse = await getMoviesByNameService(query);
        const sortedMovies = sortMoviesByVoteAverage(moviesResponse);
        setMovies(sortedMovies);
      } catch (error) {
        console.error("Erro ao buscar o filme:", error);
        setMovies([]);
      }
    },
    [setMovies]
  );

  return { getTrendingMovies, getMoviesByName };
}
