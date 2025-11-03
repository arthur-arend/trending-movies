import { useNavigate } from "react-router";
import type { IMovie } from "../../model/interfaces/IMovie";
import "./card.styles.scss";

export const Card = ({ movie }: { movie: IMovie }) => {
  const navigate = useNavigate();

  const getRatingClass = (rating: number) => {
    if (rating >= 7) return "card__rating--green";
    if (rating >= 6) return "card__rating--yellow";
    return "card__rating--red";
  };

  return (
    <div
      key={movie.id}
      className="card"
      onClick={() => navigate(`/detail/${movie.id}`)}
    >
      <img
        className="card__image"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="card__content">
        <h2 className="card__title">Título: {movie.title}</h2>
        <p className="card__date">Lançamento: {movie.release_date}</p>
        <p className="card__description">Descrição: {movie.overview}</p>
        <p className={`card__rating ${getRatingClass(movie.vote_average)}`}>
          Nota: {movie.vote_average}
        </p>
      </div>
    </div>
  );
};
