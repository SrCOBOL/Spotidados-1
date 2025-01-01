import React, { useState, useCallback } from "react";
import FilteredPieChart from "./components/FilteredPieChart";
import DetailList from "./components/detailList";
import FiltroGraf from "./components/filtroGraf";
import dbData from "./data_base/data.json";
import Auth from "./components/Login";
import LandingPage from "./components/landingpage";
import MusicStats from "./components/MusicStats";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState("login"); // "login", "landingPage", "details"
  const [filters, setFilters] = useState({
    shift: null,
    station: null,
    topFilter: null,
  });

  const [isTop100View, setIsTop100View] = useState(false); // State to control Top 100 view

  const handleLogOff = () => {
    setIsLoggedIn(false);
    setCurrentView("login");
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView("landingPage");
  };

  document.body.style = "background: rgb(34,34,34)";

  const updateFilters = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
    if (key === "shift") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        station: null,
        topFilter: null,
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        shift: null,
      }));
    }
  };

  const [grafList, setGrafList] = useState([]);
  const updateChartData = useCallback((data) => {
    setGrafList(data);
  }, []);

  const safeDbData = Array.isArray(dbData) ? dbData : [];

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
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={() => setCurrentView("details")}
            style={{
              backgroundColor: "#30cbd0",
              color: "#222",
              fontSize: "16px",
              padding: "12px 24px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#27a7a7")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#30cbd0")}
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <FiltroGraf filters={filters} onFilterChange={updateFilters} />
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={() => setIsTop100View(!isTop100View)}
            className="button"
          >
            {isTop100View ? "View Charts" : "View Top 100"}
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {isTop100View ? (
            <>
              <h2>Top 100 Artists/Tracks</h2>
              <MusicStats />
            </>
          ) : (
            <>
              <FilteredPieChart
                filters={filters}
                dbData={safeDbData}
                onChartDataUpdate={updateChartData}
              />
              <DetailList filters={filters} grafList={grafList} />
            </>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default App;
