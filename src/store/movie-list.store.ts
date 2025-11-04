import { create } from "zustand";
import type { IMovieList } from "../model/interfaces/IMovie";

interface MovieListStore {
  moviesTrending: IMovieList;
  setMoviesTrending: (movies: IMovieList) => void;
  moviesByName: IMovieList;
  setMoviesByName: (movies: IMovieList) => void;
  searchTerm: string;
  setSearchTerm: (search: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string;
  setError: (error: string) => void;
}

export const useMovieListStore = create<MovieListStore>((set) => ({
  moviesTrending: {
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  setMoviesTrending: (moviesTrending) => set({ moviesTrending }),
  moviesByName: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  setMoviesByName: (moviesByName) => set({ moviesByName }),
  searchTerm: "",
  setSearchTerm: (search) => set({ searchTerm: search }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  error: "",
  setError: (error) => set({ error }),
}));
