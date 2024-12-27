import React, { useState } from 'react';
import FilteredPieChart from './components/FilteredPieChart';
import DetailList from './components/detailList';
import FiltroGraf from './components/filtroGraf';

const App = () => {
  const [filters, setFilters] = useState({
    turno: null,
    estacao: null,
    topMusicas: null,
    topArtistas: null,
  });

  const updateFilters = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return (
    <div style={{ backgroundColor: '#222', color: '#fff', height: '100vh', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1>Simone</h1>
      </header>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <FiltroGraf filters={filters} onFilterChange={updateFilters} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <FilteredPieChart filters={filters} />
        <DetailList filters={filters} />
      </div>
    </div>
  );
};

export default App;