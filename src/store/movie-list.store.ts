import { create } from "zustand";
import type { IMovie } from "../model/interfaces/IMovie";

interface MovieListStore {
  moviesTrending: IMovie[];
  setMoviesTrending: (movies: IMovie[]) => void;
  moviesByName: IMovie[];
  setMoviesByName: (movies: IMovie[]) => void;
}

export const useMovieListStore = create<MovieListStore>((set) => ({
  moviesTrending: [],
  setMoviesTrending: (moviesTrending) => set({ moviesTrending }),
  moviesByName: [],
  setMoviesByName: (moviesByName) => set({ moviesByName }),
}));
