import { useNavigate } from "react-router";
import type { IMovie } from "../../Model/IMovie";

export const Card = ({ movie }: { movie: IMovie }) => {
  const navigate = useNavigate();
  return (
    <div key={movie.id} onClick={() => navigate(`/detail/${movie.id}`)}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
    </div>
  );
};
