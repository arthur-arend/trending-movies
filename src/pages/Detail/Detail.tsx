import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMovieById } from "../../services/movies.service";

export const Detail = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState<any>("");

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
      <div>Detail {movieDetail.title}</div>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
          alt={movieDetail.title}
        />
        <p>{movieDetail.overview}</p>
        <p>{movieDetail.release_date}</p>
        <p>{movieDetail.vote_average}</p>
        <p>{movieDetail.vote_count}</p>
      </div>
    </>
  );
};
