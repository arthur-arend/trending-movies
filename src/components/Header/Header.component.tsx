import { NavLink, useLocation, useNavigate } from "react-router";

import logo2 from "../../assets/logo2.svg";
import { useMoviesController } from "../../controllers/movies.controller";
import { SearchBar } from "../SearchBar/SearchBar.component";
import "./header.styles.scss";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getMoviesByName } = useMoviesController();

  const handleSearch = async (query: string) => {
    await getMoviesByName(query);

    if (location.pathname !== "/search") {
      navigate("/search");
    }
  };

  return (
    <div className="header">
      <div className="header__logo">
        <img src={logo2} alt="Logo" className="header__logo-image" />
        <h1 className="header__logo-title">Filmes</h1>
      </div>
      <div className="header__nav-links">
        <NavLink to="/" className="header__nav-link">
          Tendências
        </NavLink>
        <NavLink to="/under-construction" className="header__nav-link">
          Lançamentos
        </NavLink>
      </div>
      <div className="header__search-bar">
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  );
};
