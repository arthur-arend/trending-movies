import { useEffect } from "react";
import { Card } from "../../components/Card/Card.component";
import { CardSkeleton } from "../../components/CardSkeleton/CardSkeleton.component";
import { Header } from "../../components/Header/Header.component";
import { useMoviesController } from "../../controllers/movies.controller";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { useMovieListStore } from "../../store/movie-list.store";
import "./home.styles.scss";

export const Home = () => {
  const { moviesTrending, loading, error } = useMovieListStore();
  const { getTrendingMovies, loadNextPage } = useMoviesController();

  useEffect(() => {
    if (moviesTrending.results.length === 0) {
      getTrendingMovies();
    }
  }, [getTrendingMovies, moviesTrending.results.length]);

  useInfiniteScroll({
    onLoadMore: loadNextPage,
    enabled: moviesTrending.results.length > 0 && !loading,
  });

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
          ) : moviesTrending.results.length > 0 ? (
            <>
              {moviesTrending.results.map((movie) => (
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
