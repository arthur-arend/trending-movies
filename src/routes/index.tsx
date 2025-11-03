import React from "react";

import { BrowserRouter, Route, Routes } from "react-router";
import { Detail } from "../pages/Detail/Detail";
import { Home } from "../pages/Home/Home";
import { SearchPage } from "../pages/SearchPage/SearchPage";
import UnderConstruction from "../pages/UnderConstruction/UnderConstruction";

const Routing: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/under-construction" element={<UnderConstruction />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
