import type { IMovie } from "../../model/interfaces/IMovie";

export const mockMovie: IMovie = {
  id: 123,
  title: "Test Movie",
  adult: false,
  backdrop_path: "/backdrop.jpg",
  original_title: "Test Movie Original",
  origin_country: "US",
  overview: "This is a test movie overview",
  poster_path: "/test-poster.jpg",
  media_type: "movie",
  original_language: "en",
  release_date: "2024-01-01",
  video: false,
  vote_average: 8.5,
  genres: [
    { id: 1, name: "Action" },
    { id: 2, name: "Drama" },
  ],
  runtime: 120,
};

export const mockMovieDetail: IMovie = {
  id: 123,
  title: "Test Movie Detail",
  adult: false,
  backdrop_path: "/backdrop.jpg",
  original_title: "Test Movie Original",
  origin_country: "US",
  overview: "This is a detailed test movie overview",
  poster_path: "/test-poster-detail.jpg",
  media_type: "movie",
  original_language: "en",
  release_date: "2024-01-15",
  video: false,
  vote_average: 8.5,
  genres: [
    { id: 1, name: "Action" },
    { id: 2, name: "Drama" },
    { id: 3, name: "Thriller" },
  ],
  runtime: 150,
};

