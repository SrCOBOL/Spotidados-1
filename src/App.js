import React, { useState, useCallback } from "react";
import FilteredPieChart from './components/FilteredPieChart';
import DetailList from './components/detailList';
import FiltroGraf from './components/filtroGraf';
import dbData from './data_base/data.json';

const App = () => {
  const [filters, setFilters] = useState({
    turno: null,
    estacao: null,
    topFilter: null
  });
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

  return (
    <div style={{ backgroundColor: '#222',fontFamily: "Afacad", color: '#fff', height: 'auto', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1>Hello User...</h1>
      </header>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px',fontFamily: "Afacad"}}>
        <FiltroGraf filters={filters} onFilterChange={updateFilters} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column',fontFamily: "Afacad"}}>
        <FilteredPieChart filters={filters} dbData={dbData} onChartDataUpdate={updateChartData} />
        <DetailList filters={filters} grafList={grafList} />
      </div>
    </div>
  );
};

export default App;