// //O arquivo filtroGraf.js que discutimos anteriormente é um componente React responsável por lidar com a filtragem dos dados que 
// // alimentam o gráfico e a exibição dos resultados em uma lista. Esse componente serve como uma interface para o usuário selecionar filtros

import React from 'react';

const FiltroGraf = ({ filters, onFilterChange }) => {
  const handleFilterChange = (key, event) => {
    onFilterChange(key, event.target.value);
  };

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <select onChange={(e) => handleFilterChange('turno', e)} value={filters.turno || ''}>
        <option value="">Turno</option>
        <option value="manhã">Manhã</option>
        <option value="tarde">Tarde</option>
        <option value="noite">Noite</option>
        <option value="madrugada">Madrugada</option>
      </select>

      <select onChange={(e) => handleFilterChange('estacao', e)} value={filters.estacao || ''}>
        <option value="">Estação</option>
        <option value="verão">Verão</option>
        <option value="inverno">Inverno</option>
        <option value="outono">Outono</option>
        <option value="primavera">Primavera</option>
      </select>

      <select onChange={(e) => handleFilterChange('topMusicas', e)} value={filters.topMusicas || ''}>
        <option value="">Top Música</option>
        <option value="1">Top 1</option>
        <option value="5">Top 5</option>
      </select>

      <select onChange={(e) => handleFilterChange('topArtistas', e)} value={filters.topArtistas || ''}>
        <option value="">Top Artista</option>
        <option value="1">Top 1</option>
        <option value="3">Top 3</option>
      </select>
    </div>
  );
};

export default FiltroGraf;