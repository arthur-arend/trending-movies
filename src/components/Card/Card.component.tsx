import { useNavigate } from "react-router";

export const Card = ({ movie }: { movie: any }) => {
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
