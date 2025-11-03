import { create } from "zustand";
import type { IMovie } from "../model/interfaces/IMovie";

interface MovieListStore {
  moviesTrending: IMovie[];
  setMoviesTrending: (movies: IMovie[]) => void;
  moviesByName: IMovie[];
  setMoviesByName: (movies: IMovie[]) => void;
  searchTerm: string;
  setSearchTerm: (search: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string;
  setError: (error: string) => void;
}

export const useMovieListStore = create<MovieListStore>((set) => ({
  moviesTrending: [],
  setMoviesTrending: (moviesTrending) => set({ moviesTrending }),
  moviesByName: [],
  setMoviesByName: (moviesByName) => set({ moviesByName }),
  searchTerm: "",
  setSearchTerm: (search) => set({ searchTerm: search }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  error: "",
  setError: (error) => set({ error }),
}));
