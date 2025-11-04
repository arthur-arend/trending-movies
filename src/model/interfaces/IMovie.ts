export interface IMovie {
  id: number;
  title: string;
  adult: boolean;
  backdrop_path: string;
  original_title: string;
  origin_country?: string;
  overview: string;
  poster_path: string;
  media_type?: string;
  original_language: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  genres?: Array<{ id: number; name: string }>;
  runtime?: number | null;
}

export interface IMovieList {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
