import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockMovie } from "../../__tests__/utils/mock-data";
import { Card } from "./Card.component";

// Mock do useNavigate
const mockNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Card - Navegação", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("deve navegar para página de detalhes ao clicar no card", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <Card movie={mockMovie} />
      </BrowserRouter>
    );

    // Encontrar o card pela classe ou pelo texto que contém o título
    const card = screen.getByText(/título: test movie/i).closest(".card");

    expect(card).toBeInTheDocument();

    if (card) {
      await user.click(card);
      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith(`/detail/${mockMovie.id}`);
    }
  });

  it("deve renderizar informações do filme corretamente", () => {
    render(
      <BrowserRouter>
        <Card movie={mockMovie} />
      </BrowserRouter>
    );

    expect(screen.getByText(/título: test movie/i)).toBeInTheDocument();
    expect(screen.getByText(/lançamento: 2024-01-01/i)).toBeInTheDocument();
    expect(
      screen.getByText(/descrição: this is a test movie overview/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/nota: 8.5/i)).toBeInTheDocument();
  });

  it("deve renderizar imagem com src correto", () => {
    render(
      <BrowserRouter>
        <Card movie={mockMovie} />
      </BrowserRouter>
    );

    const image = screen.getByAltText(mockMovie.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500${mockMovie.poster_path}`
    );
  });

  it("deve aplicar classe de rating correta baseada na nota", () => {
    const { container } = render(
      <BrowserRouter>
        <Card movie={mockMovie} />
      </BrowserRouter>
    );

    const ratingElement = container.querySelector(".card__rating");
    expect(ratingElement).toBeInTheDocument();
    // Nota 8.5 >= 7, então deve ter classe --green
    expect(ratingElement).toHaveClass("card__rating--green");
  });

  it("deve aplicar classe de rating correta para nota média", () => {
    const movieWithMediumRating = {
      ...mockMovie,
      vote_average: 6.5,
    };

    const { container } = render(
      <BrowserRouter>
        <Card movie={movieWithMediumRating} />
      </BrowserRouter>
    );

    const ratingElement = container.querySelector(".card__rating");
    expect(ratingElement).toBeInTheDocument();
    // Nota 6.5 >= 6 e < 7, então deve ter classe --yellow
    expect(ratingElement).toHaveClass("card__rating--yellow");
  });

  it("deve aplicar classe de rating correta para nota baixa", () => {
    const movieWithLowRating = {
      ...mockMovie,
      vote_average: 5.5,
    };

    const { container } = render(
      <BrowserRouter>
        <Card movie={movieWithLowRating} />
      </BrowserRouter>
    );

    const ratingElement = container.querySelector(".card__rating");
    expect(ratingElement).toBeInTheDocument();
    // Nota 5.5 < 6, então deve ter classe --red
    expect(ratingElement).toHaveClass("card__rating--red");
  });

  it("deve navegar com ID correto do filme", async () => {
    const user = userEvent.setup();
    const customMovie = {
      ...mockMovie,
      id: 999,
    };

    render(
      <BrowserRouter>
        <Card movie={customMovie} />
      </BrowserRouter>
    );

    const card = screen.getByText(/título: test movie/i).closest(".card");

    if (card) {
      await user.click(card);
      expect(mockNavigate).toHaveBeenCalledWith("/detail/999");
    }
  });
});
