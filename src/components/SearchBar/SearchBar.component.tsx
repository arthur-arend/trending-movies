import { useRef, useState } from "react";
import { useMovieListStore } from "../../store/movie-list.store";
import "./searchBar.styles.scss";

export interface ISearchBarProps {
  onSearch: (query: string) => void | Promise<void>;
}

export const SearchBar = ({ onSearch }: ISearchBarProps) => {
  const { searchTerm, setSearchTerm } = useMovieListStore();
  const [hasError, setHasError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm) {
      setHasError(false);
      onSearch(trimmedSearchTerm);
    } else {
      setHasError(true);
      inputRef.current?.focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (hasError) {
      setHasError(false);
    }
  };

  return (
    <div className="search-bar">
      <input
        ref={inputRef}
        type="text"
        placeholder="Buscar por um filme"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        className={`search-bar__input ${hasError ? "search-bar__input--error" : ""}`}
      />
      <button onClick={handleSearch} className="search-bar__button">Buscar</button>
    </div>
  );
};
