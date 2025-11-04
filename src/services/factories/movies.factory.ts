import type { IMovie, IMovieList } from "../../model/interfaces/IMovie";

const roundVoteAverage = (voteAverage: number): number => {
  return Number(voteAverage.toFixed(1));
};

const formatReleaseDate = (dateString: string): string => {
  if (!dateString || dateString.trim() === "") {
    return "";
  }

  const dateParts = dateString.split("-");
  if (dateParts.length !== 3) {
    return dateString;
  }

  const [year, month, day] = dateParts;
  return `${day}/${month}/${year}`;
};

export const handleMovieListFactory = (jsonResponse: unknown): IMovieList => {
  if (
    !jsonResponse ||
    typeof jsonResponse !== "object" ||
    !("results" in jsonResponse) ||
    !Array.isArray(jsonResponse.results)
  ) {
    return {
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
  }

  const response = jsonResponse as Record<string, unknown>;
  const resultsArray = response.results as unknown[];

  const results = resultsArray
    .map((movie: unknown) => {
      if (!movie || typeof movie !== "object") {
        return null;
      }

      const m = movie as Record<string, unknown>;

      return {
        id: (m.id ?? 0) as number,
        title: (m.title ?? "") as string,
        adult: (m.adult ?? false) as boolean,
        backdrop_path: (m.backdrop_path ?? "") as string,
        original_title: (m.original_title ?? "") as string,
        overview: (m.overview ?? "") as string,
        poster_path: (m.poster_path ?? "") as string,
        media_type: (m.media_type ?? undefined) as string | undefined,
        original_language: (m.original_language ?? "") as string,
        release_date: formatReleaseDate((m.release_date ?? "") as string),
        video: (m.video ?? false) as boolean,
        vote_average: roundVoteAverage((m.vote_average ?? 0) as number),
      } as IMovie;
    })
    .filter((movie): movie is IMovie => movie !== null);

  return {
    page: (response.page ?? 0) as number,
    results,
    total_pages: (response.total_pages ?? 0) as number,
    total_results: (response.total_results ?? 0) as number,
  };
};

export const handleMovieFactory = (jsonResponse: unknown): IMovie | null => {
  if (!jsonResponse || typeof jsonResponse !== "object") {
    return null;
  }

  const m = jsonResponse as Record<string, unknown>;

  return {
    id: (m.id ?? 0) as number,
    title: (m.title ?? "") as string,
    adult: (m.adult ?? false) as boolean,
    backdrop_path: (m.backdrop_path ?? "") as string,
    original_title: (m.original_title ?? "") as string,
    origin_country: (m.origin_country ?? "") as string,
    overview: (m.overview ?? "") as string,
    poster_path: (m.poster_path ?? "") as string,
    media_type: (m.media_type ?? undefined) as string | undefined,
    original_language: (m.original_language ?? "") as string,
    release_date: formatReleaseDate((m.release_date ?? "") as string),
    video: (m.video ?? false) as boolean,
    vote_average: roundVoteAverage((m.vote_average ?? 0) as number),
    runtime: (m.runtime ?? null) as number | null,
    genres: Array.isArray(m.genres)
      ? (m.genres as Array<{ id: number; name: string }>)
      : undefined,
  };
};
