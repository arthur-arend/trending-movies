import axios from "axios";

export const getTrendingMovies = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/trending/movie/week?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    }
  );
  return response.data.results;
};

export const getMoviesByName = async (query: string) => {
  const response = await axios.get(
    `${
      import.meta.env.VITE_BASE_URL
    }/search/movie?query=${query}&language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    }
  );
  return response.data.results;
};

export const getMovieById = async (id: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/movie/${id}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    }
  );
  return response.data;
};
