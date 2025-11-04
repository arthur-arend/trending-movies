import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router";
import { Detail } from "./Detail";
import { server } from "../../__tests__/mocks/server";
import { http, HttpResponse } from "msw";
import { mockMovieDetail } from "../../__tests__/utils/mock-data";

// Mock do useNavigate
const mockNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Detail Page - Navegação e Comportamento", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  describe("Carregamento de detalhes", () => {
    it("deve carregar e exibir detalhes do filme pelo ID da URL", async () => {
      render(
        <MemoryRouter initialEntries={["/detail/123"]}>
          <Routes>
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(
        () => {
          expect(screen.getByText("Test Movie Detail")).toBeInTheDocument();
        },
        { timeout: 3000 }
      );

      expect(
        screen.getByText(/gênero: action, drama, thriller/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/lançamento: 15\/01\/2024/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/dura/i)).toBeInTheDocument();
      expect(screen.getByText(/150/i)).toBeInTheDocument();
      expect(screen.getByText(/nacionalidade: us/i)).toBeInTheDocument();
      expect(screen.getByText(/nota: 8.5/i)).toBeInTheDocument();
    });

    it("deve mostrar skeleton durante carregamento", () => {
      // Mock com delay para simular carregamento
      server.use(
        http.get("https://api.themoviedb.org/3/movie/:id", async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          return HttpResponse.json({
            id: 123,
            title: "Test Movie Detail",
            overview: "Test overview",
            release_date: "2024-01-15",
            poster_path: "/poster.jpg",
            vote_average: 8.5,
            genres: [{ id: 1, name: "Action" }],
            runtime: 150,
            origin_country: "US",
            adult: false,
            backdrop_path: "/backdrop.jpg",
            original_title: "Test",
            media_type: "movie",
            original_language: "en",
            video: false,
          });
        })
      );

      render(
        <MemoryRouter initialEntries={["/detail/123"]}>
          <Routes>
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </MemoryRouter>
      );

      // Verificar se skeleton está sendo renderizado inicialmente
      // O componente DetailSkeleton deve estar presente (não há classe .detail)
      const detailContainer = document.querySelector(".detail");
      expect(detailContainer).not.toBeInTheDocument();
    });

    it("deve tratar erro quando ID é inválido", async () => {
      server.use(
        http.get("https://api.themoviedb.org/3/movie/:id", () => {
          return HttpResponse.json({ error: "Not found" }, { status: 404 });
        })
      );

      render(
        <MemoryRouter initialEntries={["/detail/invalid"]}>
          <Routes>
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </MemoryRouter>
      );

      // Deve mostrar skeleton ou tratar erro graciosamente
      await waitFor(() => {
        const detailContainer = document.querySelector(".detail");
        // Se não encontrar filme, deve continuar mostrando skeleton
        expect(detailContainer).not.toBeInTheDocument();
      });
    });

    it("deve renderizar imagem do filme corretamente", async () => {
      render(
        <MemoryRouter initialEntries={["/detail/123"]}>
          <Routes>
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(
        () => {
          const image = screen.getByAltText("Test Movie Detail");
          expect(image).toBeInTheDocument();
          expect(image).toHaveAttribute(
            "src",
            `https://image.tmdb.org/t/p/w500${mockMovieDetail.poster_path}`
          );
        },
        { timeout: 3000 }
      );
    });
  });

  describe("Navegação - Botão Voltar", () => {
    it("deve navegar para página anterior ao clicar no botão voltar", async () => {
      render(
        <MemoryRouter initialEntries={["/detail/123"]}>
          <Routes>
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(
        () => {
          expect(screen.getByText("Test Movie Detail")).toBeInTheDocument();
        },
        { timeout: 3000 }
      );

      const user = userEvent.setup();
      const backButton = document.querySelector(".detail__close-button") as HTMLButtonElement;

      expect(backButton).toBeInTheDocument();
      
      await user.click(backButton);

      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    it("deve renderizar botão voltar corretamente", async () => {
      render(
        <MemoryRouter initialEntries={["/detail/123"]}>
          <Routes>
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(
        () => {
          const backButton = document.querySelector(".detail__close-button");
          expect(backButton).toBeInTheDocument();
          expect(backButton).toHaveClass("detail__close-button");
        },
        { timeout: 3000 }
      );
    });
  });

  describe("Renderização de informações", () => {
    it("deve renderizar todas as informações do filme corretamente", async () => {
      render(
        <MemoryRouter initialEntries={["/detail/123"]}>
          <Routes>
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(
        () => {
          expect(screen.getByText("Test Movie Detail")).toBeInTheDocument();
        },
        { timeout: 3000 }
      );

      // Verificar título
      expect(screen.getByText("Test Movie Detail")).toBeInTheDocument();

      // Verificar nota
      expect(screen.getByText(/nota: 8.5/i)).toBeInTheDocument();

      // Verificar gêneros
      expect(
        screen.getByText(/gênero: action, drama, thriller/i)
      ).toBeInTheDocument();

      // Verificar data de lançamento (formato dd/mm/yyyy)
      expect(
        screen.getByText(/lançamento: 15\/01\/2024/i)
      ).toBeInTheDocument();

      // Verificar duração (texto separado)
      expect(screen.getByText(/dura/i)).toBeInTheDocument();
      expect(screen.getByText(/150/i)).toBeInTheDocument();

      // Verificar nacionalidade
      expect(screen.getByText(/nacionalidade: us/i)).toBeInTheDocument();

      // Verificar descrição
      expect(
        screen.getByText(/descrição: this is a detailed test movie overview/i)
      ).toBeInTheDocument();
    });

    it("deve aplicar classe de rating correta baseada na nota", async () => {
      render(
        <MemoryRouter initialEntries={["/detail/123"]}>
          <Routes>
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(
        () => {
          const ratingElement = document.querySelector(".detail__rating");
          expect(ratingElement).toBeInTheDocument();
          // Nota 8.5 >= 7, então deve ter classe --green
          expect(ratingElement).toHaveClass("detail__rating--green");
        },
        { timeout: 3000 }
      );
    });
  });
});

