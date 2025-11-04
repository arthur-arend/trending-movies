import { http, HttpResponse } from "msw";

const API_BASE_URL = "https://api.themoviedb.org/3";

export const handlers = [
  http.get(`${API_BASE_URL}/movie/:id`, ({ params }) => {
    const { id } = params;
    if (id === "123") {
      return HttpResponse.json({
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
      });
    }
    return HttpResponse.json({ error: "Not found" }, { status: 404 });
  }),

  http.get(`${API_BASE_URL}/trending/movie/week`, ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";

    if (page === "1") {
      return HttpResponse.json({
        page: 1,
        results: [
          {
            id: 1,
            title: "Movie 1",
            adult: false,
            backdrop_path: "/backdrop1.jpg",
            original_title: "Movie 1 Original",
            overview: "Overview 1",
            poster_path: "/poster1.jpg",
            media_type: "movie",
            original_language: "en",
            release_date: "2024-01-01",
            video: false,
            vote_average: 8.5,
          },
          {
            id: 2,
            title: "Movie 2",
            adult: false,
            backdrop_path: "/backdrop2.jpg",
            original_title: "Movie 2 Original",
            overview: "Overview 2",
            poster_path: "/poster2.jpg",
            media_type: "movie",
            original_language: "en",
            release_date: "2024-01-02",
            video: false,
            vote_average: 7.5,
          },
        ],
        total_pages: 2,
        total_results: 2,
      });
    }

    return HttpResponse.json({
      page: parseInt(page),
      results: [],
      total_pages: 2,
      total_results: 2,
    });
  }),
];
