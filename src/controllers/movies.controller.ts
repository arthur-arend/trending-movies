import { useCallback } from "react";
import type { IMovie, IMovieList } from "../model/interfaces/IMovie";
import {
  getMoviesByNameService,
  getTrendingMoviesService,
} from "../services/movies.service";
import { useMovieListStore } from "../store/movie-list.store";

const sortMoviesByVoteAverage = (movies: IMovie[]): IMovie[] => {
  return [...movies].sort((a, b) => b.vote_average - a.vote_average);
};

const sortMovieListByVoteAverage = (movieList: IMovieList): IMovieList => {
  return {
    ...movieList,
    results: sortMoviesByVoteAverage(movieList.results),
  };
};

export function useMoviesController() {
  const { setMoviesTrending, setMoviesByName, setLoading, setError } =
    useMovieListStore();

  const getTrendingMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const moviesResponse = await getTrendingMoviesService(1);
      const sortedMovies = sortMovieListByVoteAverage(moviesResponse);
      setMoviesTrending(sortedMovies);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      setError("Erro ao carregar filmes em alta");
      setMoviesTrending({
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0,
      });
    } finally {
      setLoading(false);
    }
  }, [setMoviesTrending, setLoading, setError]);

  const loadNextPage = useCallback(async () => {
    try {
      const state = useMovieListStore.getState();
      const currentPage = state.moviesTrending.page;
      const totalPages = state.moviesTrending.total_pages;

      if (currentPage <= 0 || currentPage >= totalPages || totalPages === 0) {
        return;
      }

      setLoading(true);
      setError("");

      const nextPage = currentPage + 1;
      const moviesResponse = await getTrendingMoviesService(nextPage);
      const sortedMovies = sortMovieListByVoteAverage(moviesResponse);

      setMoviesTrending({
        ...sortedMovies,
        results: [...state.moviesTrending.results, ...sortedMovies.results],
      });
    } catch (error) {
      console.error("Erro ao carregar próxima página:", error);
      setError("Erro ao carregar mais filmes");
    } finally {
      setLoading(false);
    }
  }, [setMoviesTrending, setLoading, setError]);

  const getMoviesByName = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setMoviesByName({
          page: 0,
          results: [],
          total_pages: 0,
          total_results: 0,
        });
        return;
      }
      try {
        setLoading(true);
        setError("");
        const moviesResponse = await getMoviesByNameService(query);
        const sortedMovies = sortMovieListByVoteAverage(moviesResponse);
        setMoviesByName(sortedMovies);
      } catch (error) {
        console.error("Erro ao buscar o filme:", error);
        setError("Erro ao buscar o filme");
        setMoviesByName({
          page: 0,
          results: [],
          total_pages: 0,
          total_results: 0,
        });
      } finally {
        setLoading(false);
      }
    },
    [setMoviesByName, setLoading, setError]
  );

  return { getTrendingMovies, getMoviesByName, loadNextPage };
}
