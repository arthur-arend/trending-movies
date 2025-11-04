import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useMovieListStore } from "../../store/movie-list.store";
import { SearchBar } from "./SearchBar.component";

describe("SearchBar - Comportamento do Usuário", () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    useMovieListStore.setState({
      searchTerm: "",
      loading: false,
      error: "",
    });
    mockOnSearch.mockClear();
  });

  describe("Funcionalidade principal - Busca", () => {
    it("deve chamar onSearch quando usuário digita e pressiona Enter", async () => {
      const user = userEvent.setup();

      render(<SearchBar onSearch={mockOnSearch} />);

      const input = screen.getByPlaceholderText(/buscar por um filme/i);
      await user.type(input, "Batman");
      await user.keyboard("{Enter}");

      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledTimes(1);
        expect(mockOnSearch).toHaveBeenCalledWith("Batman");
      });
    });

    it("deve chamar onSearch quando usuário clica no botão Buscar", async () => {
      const user = userEvent.setup();

      render(<SearchBar onSearch={mockOnSearch} />);

      const input = screen.getByPlaceholderText(/buscar por um filme/i);
      const button = screen.getByRole("button", { name: /buscar/i });

      await user.type(input, "Spider-Man");
      await user.click(button);

      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledTimes(1);
        expect(mockOnSearch).toHaveBeenCalledWith("Spider-Man");
      });
    });

    it("deve remover espaços em branco antes de chamar onSearch", async () => {
      const user = userEvent.setup();

      render(<SearchBar onSearch={mockOnSearch} />);

      const input = screen.getByPlaceholderText(/buscar por um filme/i);
      await user.type(input, "  Avengers  ");
      await user.keyboard("{Enter}");

      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledWith("Avengers");
        expect(mockOnSearch).not.toHaveBeenCalledWith("  Avengers  ");
      });
    });
  });

  describe("Validação - Busca vazia", () => {
    it("deve mostrar erro visual quando busca está vazia e usuário pressiona Enter", async () => {
      const user = userEvent.setup();

      render(<SearchBar onSearch={mockOnSearch} />);

      const input = screen.getByPlaceholderText(/buscar por um filme/i);

      // Focar no input e pressionar Enter
      await user.click(input);
      await user.keyboard("{Enter}");

      await waitFor(
        () => {
          expect(input).toHaveClass("search-bar__input--error");
          expect(mockOnSearch).not.toHaveBeenCalled();
        },
        { timeout: 2000 }
      );
    });

    it("deve mostrar erro visual quando busca está vazia e usuário clica no botão", async () => {
      const user = userEvent.setup();

      render(<SearchBar onSearch={mockOnSearch} />);

      const button = screen.getByRole("button", { name: /buscar/i });
      await user.click(button);

      const input = screen.getByPlaceholderText(/buscar por um filme/i);

      await waitFor(() => {
        expect(input).toHaveClass("search-bar__input--error");
        expect(mockOnSearch).not.toHaveBeenCalled();
      });
    });

    it("deve mostrar erro quando busca contém apenas espaços em branco", async () => {
      const user = userEvent.setup();

      render(<SearchBar onSearch={mockOnSearch} />);

      const input = screen.getByPlaceholderText(/buscar por um filme/i);
      await user.type(input, "   ");
      await user.keyboard("{Enter}");

      await waitFor(() => {
        expect(input).toHaveClass("search-bar__input--error");
        expect(mockOnSearch).not.toHaveBeenCalled();
      });
    });

    it("deve focar no input quando busca está vazia", async () => {
      const user = userEvent.setup();

      render(<SearchBar onSearch={mockOnSearch} />);

      const input = screen.getByPlaceholderText(
        /buscar por um filme/i
      ) as HTMLInputElement;
      const button = screen.getByRole("button", { name: /buscar/i });

      // Garantir que o input não está focado inicialmente
      input.blur();

      await user.click(button);

      await waitFor(() => {
        expect(document.activeElement).toBe(input);
      });
    });
  });

  describe("Atualização do input em tempo real", () => {
    it("deve atualizar o valor do input quando usuário digita", async () => {
      const user = userEvent.setup();

      render(<SearchBar onSearch={mockOnSearch} />);

      const input = screen.getByPlaceholderText(/buscar por um filme/i);

      await user.type(input, "Batman");

      expect(input).toHaveValue("Batman");
    });

    it("deve atualizar o store quando usuário digita", async () => {
      const user = userEvent.setup();

      render(<SearchBar onSearch={mockOnSearch} />);

      const input = screen.getByPlaceholderText(/buscar por um filme/i);

      await user.type(input, "Superman");

      await waitFor(() => {
        const state = useMovieListStore.getState();
        expect(state.searchTerm).toBe("Superman");
      });
    });

    it("deve remover erro quando usuário começa a digitar após erro", async () => {
      const user = userEvent.setup();

      render(<SearchBar onSearch={mockOnSearch} />);

      const input = screen.getByPlaceholderText(/buscar por um filme/i);

      // Tentar buscar vazio usando botão (causa erro)
      const button = screen.getByRole("button", { name: /buscar/i });
      await user.click(button);

      await waitFor(
        () => {
          expect(input).toHaveClass("search-bar__input--error");
        },
        { timeout: 2000 }
      );

      // Começar a digitar (deve remover erro)
      await user.type(input, "A");

      await waitFor(() => {
        expect(input).not.toHaveClass("search-bar__input--error");
      });
    });

    it("deve manter o valor sincronizado com o store", async () => {
      const user = userEvent.setup();

      render(<SearchBar onSearch={mockOnSearch} />);

      const input = screen.getByPlaceholderText(/buscar por um filme/i);

      // Simular digitação
      await user.type(input, "Wonder Woman");

      // Alterar o store diretamente dentro de act
      await act(async () => {
        useMovieListStore.setState({ searchTerm: "Justice League" });
      });

      await waitFor(() => {
        expect(input).toHaveValue("Justice League");
      });
    });
  });

  describe("Integração - Fluxo completo", () => {
    it("deve executar busca válida após erro anterior", async () => {
      const user = userEvent.setup();

      render(<SearchBar onSearch={mockOnSearch} />);

      const input = screen.getByPlaceholderText(/buscar por um filme/i);
      const button = screen.getByRole("button", { name: /buscar/i });

      // Tentar buscar vazio (erro)
      await user.click(button);

      await waitFor(
        () => {
          expect(input).toHaveClass("search-bar__input--error");
        },
        { timeout: 2000 }
      );

      // Digitar termo válido (remove erro)
      await user.type(input, "Matrix");

      await waitFor(() => {
        expect(input).not.toHaveClass("search-bar__input--error");
      });

      // Buscar novamente
      await user.click(button);

      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledWith("Matrix");
      });
    });

    it("deve limpar input e buscar novamente corretamente", async () => {
      const user = userEvent.setup();

      render(<SearchBar onSearch={mockOnSearch} />);

      const input = screen.getByPlaceholderText(/buscar por um filme/i);

      // Primeira busca
      await user.type(input, "First Movie");
      await user.keyboard("{Enter}");

      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledWith("First Movie");
      });

      // Limpar e buscar novamente
      await user.clear(input);
      await user.type(input, "Second Movie");
      await user.keyboard("{Enter}");

      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledWith("Second Movie");
        expect(mockOnSearch).toHaveBeenCalledTimes(2);
      });
    });
  });
});
