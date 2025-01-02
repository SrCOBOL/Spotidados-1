// //O arquivo filtroGraf.js que discutimos anteriormente é um componente React responsável por lidar com a filtragem dos dados que
// // alimentam o gráfico e a exibição dos resultados em uma lista. Esse componente serve como uma interface para o usuário selecionar filtros

import React from "react";

const FiltroGraf = ({ filters, onFilterChange }) => {
  const handleFilterChange = (key, event) => {
    onFilterChange(key, event.target.value);
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <select
        onChange={(e) => handleFilterChange("turno", e)}
        value={filters.turno || ""}
        disabled={filters.estacao || filters.topFilter}
      >
        <option value="">Shift</option>
        <option value="Morning">Morning</option>
        <option value="Afternoon">Afternoon</option>
        <option value="Night">Night</option>
        <option value="Early morning">Early morning</option>
      </select>

      <select
        onChange={(e) => handleFilterChange("estacao", e)}
        value={filters.estacao || ""}
        disabled={filters.turno}
      >
        <option value="">Season</option>
        <option value="Summer">Summer</option>
        <option value="Winter">Winter</option>
        <option value="Fall">Fall</option>
        <option value="Spring">Spring</option>
      </select>

      <select
        onChange={(e) => handleFilterChange("topFilter", e)}
        value={filters.topFilter || ""}
        disabled={filters.turno}
      >
        <option value="">Top</option>
        <option value="musica">Top Music</option>
        <option value="artista">Top Artist</option>
      </select>
    </div>
  );
};

export default FiltroGraf;
