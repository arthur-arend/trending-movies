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
  const {
    setMoviesTrending,
    setMoviesByName,
    setLoading,
    setError,
    setCurrentPage,
  } = useMovieListStore();

  const getTrendingMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      setCurrentPage(1);
      const moviesResponse = await getTrendingMoviesService(1);
      const sortedMovies = sortMoviesByVoteAverage(moviesResponse);
      setMoviesTrending(sortedMovies);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      setError("Erro ao carregar filmes em alta");
      setMoviesTrending([]);
    } finally {
      setLoading(false);
    }
  }, [setMoviesTrending, setLoading, setError, setCurrentPage]);

  const loadNextPage = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const state = useMovieListStore.getState();
      const nextPage = state.currentPage + 1;

      const moviesResponse = await getTrendingMoviesService(nextPage);
      const sortedMovies = sortMoviesByVoteAverage(moviesResponse);

      setMoviesTrending([...state.moviesTrending, ...sortedMovies]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Erro ao carregar próxima página:", error);
      setError("Erro ao carregar mais filmes");
    } finally {
      setLoading(false);
    }
  }, [setMoviesTrending, setLoading, setError, setCurrentPage]);

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

  return { getTrendingMovies, getMoviesByName, loadNextPage };
}
