import { useState } from "react";

export interface ISearchBarProps {
  onSearch: (query: string) => void | Promise<void>;
  initialValue?: string;
}

export const SearchBar = ({ onSearch, initialValue }: ISearchBarProps) => {
  const [search, setSearch] = useState(initialValue || "");

  return (
    <>
      <input
        type="text"
        placeholder="Buscar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => onSearch(search)}>Buscar</button>
    </>
  );
};
