import { useEffect } from "react";
import { Card } from "../../components/Card/Card.component";
import { CardSkeleton } from "../../components/CardSkeleton/CardSkeleton.component";
import { Header } from "../../components/Header/Header";
import { useMoviesController } from "../../controllers/movies.controller";
import { useMovieListStore } from "../../store/movie-list.store";
import "./home.styles.scss";

export const Home = () => {
  const { moviesTrending, loading, error } = useMovieListStore();
  const { getTrendingMovies, loadNextPage } = useMoviesController();

  useEffect(() => {
    if (moviesTrending.length === 0) {
      getTrendingMovies();
    }
  }, [getTrendingMovies, moviesTrending.length]);

  useEffect(() => {
    if (moviesTrending.length === 0 || loading) {
      return;
    }

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadNextPage();
        }
      },
      {
        rootMargin: "100px",
      }
    );

    const sentinel = document.querySelector("#infinite-scroll");
    if (sentinel) {
      intersectionObserver.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        intersectionObserver.unobserve(sentinel);
      }
      intersectionObserver.disconnect();
    };
  }, [moviesTrending.length, loading, loadNextPage]);

  return (
    <>
      <Header />
      <div className="home-page">
        <h1 className="home-page__title">Tendências</h1>
        <div className="movies-list">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={`skeleton-${index}`} />
            ))
          ) : error ? (
            <div className="home-page__message home-page__message--error">
              {error}
            </div>
          ) : moviesTrending.length > 0 ? (
            <>
              {moviesTrending.map((movie) => (
                <Card key={movie.id} movie={movie} />
              ))}
              <div id="infinite-scroll" />
            </>
          ) : (
            <div className="home-page__message">Nenhum filme encontrado.</div>
          )}
        </div>
      </div>
    </>
  );
};
