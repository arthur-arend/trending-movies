import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DetailSkeleton } from "../../components/DetailSkeleton/DetailSkeleton.component";
import { Header } from "../../components/Header/Header";
import type { IMovie } from "../../model/interfaces/IMovie";
import "./detail.styles.scss";

import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useDetailController } from "./controllers/detail.controller";

export const Detail = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState<IMovie | null>(null);
  const { getMovieById } = useDetailController(setMovieDetail);
  const navigate = useNavigate();

  useEffect(() => {
    getMovieById(id);
  }, [id, getMovieById]);

  const getRatingClass = (rating: number) => {
    if (rating >= 7) return "detail__rating--green";
    if (rating >= 6) return "detail__rating--yellow";
    return "detail__rating--red";
  };

  return (
    <>
      <Header />
      {!movieDetail ? (
        <DetailSkeleton />
      ) : (
        <div className="detail">
          <div className="detail__container">
            <button
              onClick={() => navigate(-1)}
              className="detail__close-button"
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
              alt={movieDetail.title}
              className="detail__image"
            />
            <div className="detail__info">
              <p
                className={`detail__rating ${getRatingClass(
                  movieDetail.vote_average
                )}`}
              >
                Nota: {movieDetail.vote_average}
              </p>
              <h1 className="detail__title">{movieDetail.title}</h1>
              <p className="detail__text">
                Gênero:{" "}
                {movieDetail.genres?.map((genre) => genre.name).join(", ")}
              </p>
              <p className="detail__text">
                Lançamento: {movieDetail.release_date}
              </p>
              <p className="detail__text">
                Nacionalidade: {movieDetail.origin_country}
              </p>
              <p className="detail__text detail__description">
                Descrição: {movieDetail.overview}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
