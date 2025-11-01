import React from "react";

import { BrowserRouter, Route, Routes } from "react-router";
import { Detail } from "../pages/Detail/Detail";
import { Home } from "../pages/Home/Home";

const Routing: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
