//O componente FilteredPieChart é responsável por receber os dados filtrados e exibi-los em um gráfico de pizza. 
// Esse gráfico é dinâmico e reflete as mudanças feitas pelos filtros selecionados no filtroGraf.js

import React from 'react';
import PieChart from './PieChart';

const FilteredPieChart = ({ filters }) => {
  const data = [
    { value: 1048, name: 'Manhã' },
    { value: 735, name: 'Tarde' },
    { value: 580, name: 'Noite' },
    { value: 484, name: 'Madrugada' },
  ];

  const filteredData = data.filter((item) => {
    if (!filters.turno) return true;
    return item.name.toLowerCase() === filters.turno.toLowerCase();
  });

  return (
    <div>
      <h3>Estatísticas</h3>
      <PieChart data={filteredData} />
    </div>
  );
};

export default FilteredPieChart;