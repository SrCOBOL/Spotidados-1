import React, { useState } from "react";
import Auth from "./components/Login";
import LandingPage from "./components/landingpage";
import FiltroGraf from "./components/filtroGraf";
import FilteredPieChart from "./components/FilteredPieChart";
import DetailList from "./components/detailList";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filters, setFilters] = useState({
    turno: null,
    estacao: null,
    topMusicas: null,
    topArtistas: null,
  });

  const handleLogOff = () => {
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const updateFilters = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return (
    <div>
      {isLoggedIn ? (
        <div
          style={{
            backgroundColor: "#222",
            color: "#fff",
            height: "100vh",
            padding: "20px",
          }}
        >
          {/*---------------------- Renderizando da página de dados --------------------*/}
          <LandingPage onLogOff={handleLogOff} />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <FiltroGraf filters={filters} onFilterChange={updateFilters} />
          </div>

          {/* -----------------------------Gráficos e detalhes ------------------------*/}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <FilteredPieChart filters={filters} />
            <DetailList filters={filters} />
          </div>
        </div>
      ) : (
        <Auth onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
