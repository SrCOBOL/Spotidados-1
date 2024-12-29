// //O arquivo filtroGraf.js que discutimos anteriormente é um componente React responsável por lidar com a filtragem dos dados que 
// // alimentam o gráfico e a exibição dos resultados em uma lista. Esse componente serve como uma interface para o usuário selecionar filtros

import React from 'react';

const FiltroGraf = ({ filters, onFilterChange }) => {
  const handleFilterChange = (key, event) => {
    onFilterChange(key, event.target.value);
  };

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <select onChange={(e) => handleFilterChange('turno', e)} value={filters.turno || ''} disabled={filters.estacao || filters.topFilter}>
        <option value="">Turno</option>
        <option value="manhã">Manhã</option>
        <option value="tarde">Tarde</option>
        <option value="noite">Noite</option>
        <option value="madrugada">Madrugada</option>
      </select>

      <select onChange={(e) => handleFilterChange('estacao', e)} value={filters.estacao || ''} disabled={filters.turno}>
        <option value="">Estação</option>
        <option value="verão">Verão</option>
        <option value="inverno">Inverno</option>
        <option value="outono">Outono</option>
        <option value="primavera">Primavera</option>
      </select>

      <select onChange={(e) => handleFilterChange('topFilter', e)} value={filters.topFilter || ''} disabled={filters.turno}>
        <option value="">Top Filtro</option>
        <option value="musica">Top Música</option>
        <option value="artista">Top Artista</option>
      </select>
    </div>
  );
};

export default FiltroGraf;