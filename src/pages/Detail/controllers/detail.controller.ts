import { useCallback } from "react";
import type { IMovie } from "../../../Model/IMovie";
import { getMovieByIdService } from "../../../services/movies.service";

export function useDetailController(setMovie: (movie: IMovie | null) => void) {
  const getMovieById = useCallback(
    async (id: string | undefined) => {
      if (!id) {
        return;
      }

      try {
        const movieResponse = await getMovieByIdService(id);
        setMovie(movieResponse);
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
        setMovie(null);
      }
    },
    [setMovie]
  );

  return { getMovieById };
}
