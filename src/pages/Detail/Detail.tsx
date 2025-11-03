import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { IMovie } from "../../Model/IMovie";

import { useDetailController } from "./controllers/detail.controller";

export const Detail = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState<IMovie | null>(null);
  const { getMovieById } = useDetailController(setMovieDetail);

  const navigate = useNavigate();

  useEffect(() => {
    getMovieById(id);
  }, [id, getMovieById]);
  return (
    <>
      {!movieDetail ? (
        <div>Loading...</div>
      ) : (
        <div>
          <button onClick={() => navigate(-1)}>Voltar</button>
          <h1>{movieDetail.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
            alt={movieDetail.title}
          />
          <p>{movieDetail.overview}</p>
          <p>{movieDetail.release_date}</p>
          <p>{movieDetail.vote_average}</p>
        </div>
      )}
    </>
  );
};
