import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import { Card } from "../../components/Card/Card.component";
import { CardSkeleton } from "../../components/CardSkeleton/CardSkeleton.component";
import { Header } from "../../components/Header/Header.component";
import { useMovieListStore } from "../../store/movie-list.store";
import "./searchPage.styles.scss";

export const SearchPage = () => {
  const { moviesByName, loading, error } = useMovieListStore();
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="search-page">
        <div className="search-page__header">
          <h1 className="search-page__title">Resultados da busca</h1>
          <button
            onClick={() => navigate(-1)}
            className="search-page__back-button"
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        </div>

        <div className="movies-list">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={`skeleton-${index}`} />
            ))
          ) : error ? (
            <div className="search-page__message search-page__message--error">
              {error}
            </div>
          ) : moviesByName.results.length > 0 ? (
            moviesByName.results.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))
          ) : (
            <div className="search-page__message">
              Nenhum filme encontrado. Tente buscar com outro termo.
            </div>
          )}
        </div>
      </div>
    </>
  );
};
