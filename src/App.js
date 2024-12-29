import React, { useState, useCallback } from "react";
import FilteredPieChart from './components/FilteredPieChart';
import DetailList from './components/detailList';
import FiltroGraf from './components/filtroGraf';
import dbData from './data_base/data.json';
import Auth from "./components/Login";
import LandingPage from "./components/landingpage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState("login"); // "login", "landingPage", "details"
  const [filters, setFilters] = useState({
    turno: null,
    estacao: null,
    topFilter: null
  });

  const handleLogOff = () => {
    setIsLoggedIn(false);
    setCurrentView("login");
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView("landingPage");
  };
  document.body.style = 'background: rgb(34,34,34)';

  const updateFilters = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
    if (key === 'turno') {
      setFilters((prevFilters) => ({
        ...prevFilters,
        estacao: null,
        topFilter: null,
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        turno: null,
      }));
    }
  };

  const [grafList, setGrafList] = useState([]);
  const updateChartData = useCallback((data) => {
    setGrafList(data);
  }, []);

  const safeDbData = Array.isArray(dbData) ? dbData : [];

  // Render views based on the current state
  if (currentView === "login") {
    return <Auth onLogin={handleLogin} />;
  }

  if (currentView === "landingPage") {
    return (
      <div
        style={{
          backgroundColor: "rgb(34,34,34",
          color: "#fff",
          height: "100vh",
          padding: "20px",
        }}
      >
        <LandingPage onLogOff={handleLogOff} />
        <div style={{ textAlign: "center", marginTop: "20px", }}>
          <button
            onClick={() => setCurrentView("details")}
            className="button" // Adicionando a classe 'button'
          >
            More Details
          </button>
        </div>
      </div>
    );
  }

  if (currentView === "details") {
    return (
      <div
        style={{
          backgroundColor: "#222",
          color: "#fff",
          height: "100vh",
          padding: "20px",
        }}
      >
        <button
          onClick={() => setCurrentView("landingPage")}
          style={{
            margin: "20px auto",
            display: "block",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#30cbd0",
            color: "#222",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Back to Landing Page
        </button>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <FiltroGraf filters={filters} onFilterChange={updateFilters} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <FilteredPieChart filters={filters} dbData={safeDbData} onChartDataUpdate={updateChartData} />
          <DetailList filters={filters} grafList={grafList} />
        </div>
      </div>
    );
  }

  return null; // Fallback (should never hit this)
};

export default App;
