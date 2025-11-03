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
  const { setMoviesTrending, setMoviesByName, setLoading, setError } =
    useMovieListStore();

  const getTrendingMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const moviesResponse = await getTrendingMoviesService();
      const sortedMovies = sortMoviesByVoteAverage(moviesResponse);
      setMoviesTrending(sortedMovies);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      setError("Erro ao carregar filmes em alta");
      setMoviesTrending([]);
    } finally {
      setLoading(false);
    }
  }, [setMoviesTrending, setLoading, setError]);

  const getMoviesByName = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setMoviesByName([]);
        return;
      }
      try {
        setLoading(true);
        setError("");
        const moviesResponse = await getMoviesByNameService(query);
        const sortedMovies = sortMoviesByVoteAverage(moviesResponse);
        setMoviesByName(sortedMovies);
      } catch (error) {
        console.error("Erro ao buscar o filme:", error);
        setError("Erro ao buscar o filme");
        setMoviesByName([]);
      } finally {
        setLoading(false);
      }
    },
    [setMoviesByName, setLoading, setError]
  );

  return { getTrendingMovies, getMoviesByName };
}
