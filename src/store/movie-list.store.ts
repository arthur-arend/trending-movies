import { create } from "zustand";
import type { IMovie } from "../Model/IMovie";

interface MovieListStore {
  movies: IMovie[];
  setMovies: (movies: IMovie[]) => void;
}

export const useMovieListStore = create<MovieListStore>((set) => ({
  movies: [],
  setMovies: (movies) => set({ movies }),
}));

