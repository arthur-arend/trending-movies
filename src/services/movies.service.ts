import axios from "axios";
import {
  handleMovieFactory,
  handleMovieListFactory,
} from "./factories/movies.factory";

export const getTrendingMoviesService = async (page: number) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/week?language=pt-BR&page=${page}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    }
  );
  return handleMovieListFactory(response.data);
};

export const getMoviesByNameService = async (query: string) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}&language=pt-BR`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    }
  );
  return handleMovieListFactory(response.data);
};

export const getMovieByIdService = async (id: string) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    }
  );
  return handleMovieFactory(response.data);
};
