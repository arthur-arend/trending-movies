import axios from "axios";
import {
  handleMovieFactory,
  handleMovieListFactory,
} from "./factories/movies.factory";

export const getTrendingMoviesService = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/trending/movie/week?language=pt-BR`,
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
    `${
      import.meta.env.VITE_BASE_URL
    }/search/movie?query=${query}&language=pt-BR`,
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
    `${import.meta.env.VITE_BASE_URL}/movie/${id}?language=pt-BR`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    }
  );
  return handleMovieFactory(response.data);
};
