import { render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { BrowserRouter } from "react-router";
import { beforeEach, describe, expect, it } from "vitest";
import { server } from "../../__tests__/mocks/server";
import { useMovieListStore } from "../../store/movie-list.store";
import { Home } from "./Home";

describe("Home Page - Comportamento do Usuário", () => {
  beforeEach(() => {
    useMovieListStore.setState({
      moviesTrending: {
        page: 1,
        results: [],
        total_pages: 0,
        total_results: 0,
      },
      loading: false,
      error: "",
    });
  });

  describe("Carregamento de filmes na inicialização", () => {
    it("deve carregar filmes em tendência na inicialização", async () => {
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );

      // Aguardar o carregamento dos filmes
      await waitFor(
        () => {
          const title = document.querySelector(".home-page__title");
          expect(title).toHaveTextContent("Tendências");
          expect(screen.getByText(/movie 1/i)).toBeInTheDocument();
          expect(screen.getByText(/movie 2/i)).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });

    it("deve renderizar título da página corretamente", async () => {
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );

      const title = document.querySelector(".home-page__title");
      expect(title).toHaveTextContent("Tendências");
    });

    it("deve renderizar lista de filmes quando carregado com sucesso", async () => {
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );

      await waitFor(
        () => {
          // Verificar se os cards de filmes estão sendo renderizados
          expect(screen.getByText(/movie 1/i)).toBeInTheDocument();
          expect(screen.getByText(/movie 2/i)).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });

    it("não deve carregar filmes novamente se já existirem", async () => {
      // Pré-popular o store com filmes
      useMovieListStore.setState({
        moviesTrending: {
          page: 1,
          results: [
            {
              id: 999,
              title: "Existing Movie",
              adult: false,
              backdrop_path: "/backdrop.jpg",
              original_title: "Existing Movie",
              overview: "Existing overview",
              poster_path: "/poster.jpg",
              media_type: "movie",
              original_language: "en",
              release_date: "2024-01-01",
              video: false,
              vote_average: 8.0,
            },
          ],
          total_pages: 1,
          total_results: 1,
        },
      });

      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );

      // Deve mostrar o filme existente imediatamente
      expect(screen.getByText(/título: existing movie/i)).toBeInTheDocument();
    });
  });

  describe("Skeleton durante carregamento", () => {
    it("deve mostrar skeleton durante carregamento", async () => {
      // Mock com delay para simular carregamento
      server.use(
        http.get(
          "https://api.themoviedb.org/3/trending/movie/week",
          async () => {
            await new Promise((resolve) => setTimeout(resolve, 200));
            return HttpResponse.json({
              page: 1,
              results: [
                {
                  id: 1,
                  title: "Movie 1",
                  overview: "Overview 1",
                  release_date: "2024-01-01",
                  poster_path: "/poster1.jpg",
                  vote_average: 8.5,
                  adult: false,
                  backdrop_path: "/backdrop1.jpg",
                  original_title: "Movie 1",
                  media_type: "movie",
                  original_language: "en",
                  video: false,
                },
              ],
              total_pages: 1,
              total_results: 1,
            });
          }
        )
      );

      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );

      // Verificar se skeletons estão sendo renderizados inicialmente
      // O CardSkeleton deve estar presente (classe card-skeleton)
      await waitFor(
        () => {
          const skeletons = document.querySelectorAll(".card-skeleton");
          // Deve haver 6 skeletons (conforme definido no componente Home)
          expect(skeletons.length).toBe(6);
        },
        { timeout: 50 }
      );
    });
  });

  describe("Tratamento de erros", () => {
    it("deve mostrar erro quando API falha", async () => {
      server.use(
        http.get("https://api.themoviedb.org/3/trending/movie/week", () => {
          return HttpResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
          );
        })
      );

      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );

      await waitFor(
        () => {
          expect(
            screen.getByText(/erro ao carregar filmes em alta/i)
          ).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });

    it("deve mostrar mensagem de erro correta", async () => {
      server.use(
        http.get("https://api.themoviedb.org/3/trending/movie/week", () => {
          return HttpResponse.json({ error: "Not found" }, { status: 404 });
        })
      );

      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );

      await waitFor(
        () => {
          const errorMessage = screen.getByText(
            /erro ao carregar filmes em alta/i
          );
          expect(errorMessage).toBeInTheDocument();
          expect(errorMessage).toHaveClass("home-page__message--error");
        },
        { timeout: 3000 }
      );
    });

    it("não deve mostrar filmes quando há erro", async () => {
      server.use(
        http.get("https://api.themoviedb.org/3/trending/movie/week", () => {
          return HttpResponse.json({ error: "Error" }, { status: 500 });
        })
      );

      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );

      await waitFor(
        () => {
          expect(
            screen.getByText(/erro ao carregar filmes em alta/i)
          ).toBeInTheDocument();
          // Não deve mostrar filmes
          expect(screen.queryByText(/movie 1/i)).not.toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });
  });

  describe("Sem resultados", () => {
    it("deve mostrar mensagem quando não há filmes", async () => {
      server.use(
        http.get("https://api.themoviedb.org/3/trending/movie/week", () => {
          return HttpResponse.json({
            page: 1,
            results: [],
            total_pages: 0,
            total_results: 0,
          });
        })
      );

      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );

      await waitFor(
        () => {
          expect(
            screen.getByText(/nenhum filme encontrado/i)
          ).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });

    it("deve mostrar mensagem correta quando lista está vazia", async () => {
      // Configurar handler ANTES de resetar o store
      server.use(
        http.get("https://api.themoviedb.org/3/trending/movie/week", () => {
          return HttpResponse.json({
            page: 1,
            results: [],
            total_pages: 0,
            total_results: 0,
          });
        })
      );

      // Resetar store para garantir estado inicial vazio
      useMovieListStore.setState({
        moviesTrending: {
          page: 1,
          results: [],
          total_pages: 0,
          total_results: 0,
        },
        loading: false,
        error: "",
      });

      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );

      await waitFor(
        () => {
          const message = screen.getByText(/nenhum filme encontrado/i);
          expect(message).toBeInTheDocument();
          expect(message).toHaveClass("home-page__message");
        },
        { timeout: 3000 }
      );
    });
  });

  describe("Renderização de Header", () => {
    it("deve renderizar Header na página", () => {
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );

      // Verificar se Header está presente (pelo logo ou título)
      expect(screen.getByText(/filmes/i)).toBeInTheDocument();
    });
  });
});
