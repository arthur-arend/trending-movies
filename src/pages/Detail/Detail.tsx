import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import type { IMovie } from "../../Model/IMovie";
import { getMovieById } from "../../services/movies.service";

export const Detail = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState<IMovie | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    getMovieById(id).then((movie) => {
      setMovieDetail(movie);
      console.log(movie, "movieDetail");
    });
    console.log(movieDetail, "movieDetail");
  }, [id]);
  return (
    <>
      {!movieDetail ? (
        <div>Loading...</div>
      ) : (
        <div>
          <NavLink to="/">Home</NavLink>
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
