import { useCallback } from "react";
import type { IMovie } from "../model/interfaces/IMovie";
import {
  getMoviesByNameService,
  getTrendingMoviesService,
} from "../services/movies.service";
import { useMovieListStore } from "../store/movie-list.store";

const sortMoviesByVoteAverage = (movies: IMovie[]): IMovie[] => {
  return [...movies].sort((a, b) => b.vote_average - a.vote_average);
};

export function useMoviesController() {
  const { setMoviesTrending, setMoviesByName } = useMovieListStore();

  const getTrendingMovies = useCallback(async () => {
    try {
      const moviesResponse = await getTrendingMoviesService();
      const sortedMovies = sortMoviesByVoteAverage(moviesResponse);
      setMoviesTrending(sortedMovies);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      setMoviesTrending([]);
    }
  }, [setMoviesTrending]);

  const getMoviesByName = useCallback(
    async (query: string) => {
      try {
        const moviesResponse = await getMoviesByNameService(query);
        const sortedMovies = sortMoviesByVoteAverage(moviesResponse);
        setMoviesByName(sortedMovies);
      } catch (error) {
        console.error("Erro ao buscar o filme:", error);
        setMoviesByName([]);
      }
    },
    [setMoviesByName]
  );

  return { getTrendingMovies, getMoviesByName };
}
