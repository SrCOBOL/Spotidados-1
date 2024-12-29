//O componente FilteredPieChart é responsável por receber os dados filtrados e exibi-los em um gráfico de pizza.
// Esse gráfico é dinâmico e reflete as mudanças feitas pelos filtros selecionados no filtroGraf.js

import React, { useEffect } from "react";
import PieChart from "./PieChart";

const FilteredPieChart = ({ filters, dbData, onChartDataUpdate  }) => {
  // Função para determinar a estação do ano com base em uma data
  const getEstacao = (date) => {
    const month = date.getUTCMonth() + 1; // Mês (1-12)
    const day = date.getUTCDate(); // Dia do mês

    if ((month === 12 && day >= 21) || (month <= 3 && day <= 20))
      return "inverno";
    if ((month === 3 && day >= 21) || (month <= 6 && day <= 20))
      return "primavera";
    if ((month === 6 && day >= 21) || (month <= 9 && day <= 20)) return "verão";
    if ((month === 9 && day >= 21) || (month <= 12 && day <= 20))
      return "outono";

    return null; // Caso algo inesperado aconteça
  };

  const mapToChart = (data) => {
    if (filters.topFilter) {
      var xaxa = data.map(p => ({
        value: p.contador,
        name: p.trackName
      }))
      return xaxa
    } else 
    if (filters.estacao) {
      return [
        {
          value: data.length,
          name:
            filters.estacao.charAt(0).toUpperCase() + filters.estacao.slice(1),
        },
      ];
    } else {
      const mappedData = [
        { value: data.manha.length, name: "Manhã" },
        { value: data.tarde.length, name: "Tarde" },
        { value: data.noite.length, name: "Noite" },
        { value: data.madrugada.length, name: "Madrugada" },
      ];
      return mappedData.filter((item) => {
        if (!filters.turno) return true;
        return item.name.toLowerCase() === filters.turno.toLowerCase();
      });
    }

  };

  const filterTurno = (data) => {
    const result = {
      manha: [], // 06:00 - 12:00
      tarde: [], // 12:00 - 18:00
      noite: [], // 18:00 - 00:00
      madrugada: [], // 00:00 - 06:00
    };

    data.forEach((item) => {
      const hour = new Date(item.ts).getUTCHours(); // Extrai a hora em UTC
      if (item.master_metadata_track_name !== null) {
        
        if (hour >= 6 && hour < 12) {
          result.manha.push(item);
        } else if (hour >= 12 && hour < 18) {
          result.tarde.push(item);
        } else if (hour >= 18 && hour < 24) {
          result.noite.push(item);
        } else {
          result.madrugada.push(item);
        }
      }
      });

    return result;
  };

  const filterEstacao = (data) => {
    // Filtrar objetos pela estação especificada
    return data.filter((item) => {
      const date = new Date(item.ts); // Converter timestamp para Date
      return item.master_metadata_track_name !== null && getEstacao(date) === filters.estacao;
    });
  };

  const filterTop = (data) => {
    if (filters.topFilter === 'musica') {
      // Agrupar por master_metadata_track_name e contar ocorrências
      const musicaMap = data.reduce((acc, item) => {
        if (item.master_metadata_track_name === null) {
          return acc;
        }
        const trackName = item.master_metadata_track_name;
        if (!acc[trackName]) {
          acc[trackName] = { 
            trackName, 
            contador: 0, 
            ts: item.ts 
          };
        }
        acc[trackName].contador += 1;
        return acc;
      }, {});
  
      // Transformar o objeto em um array, ordenar e pegar os top 5
      return Object.values(musicaMap)
        .sort((a, b) => b.contador - a.contador) // Ordenar pelo contador (descendente)
        .slice(0, 5); // Selecionar os 5 primeiros
    }

    if (filters.topFilter === 'artista') {
      // Agrupar por master_metadata_album_artist_name e contar ocorrências
      const musicaMap = data.reduce((acc, item) => {
        if (item.master_metadata_album_artist_name === null) {
          return acc;
        }
        const trackName = item.master_metadata_album_artist_name;
        if (!acc[trackName]) {
          acc[trackName] = { 
            trackName, 
            contador: 0, 
            ts: item.ts 
          };
        }
        acc[trackName].contador += 1;
        return acc;
      }, {});
  
      // Transformar o objeto em um array, ordenar e pegar os top 5
      return Object.values(musicaMap)
        .sort((a, b) => b.contador - a.contador) // Ordenar pelo contador (descendente)
        .slice(0, 3); // Selecionar os 5 primeiros
    }
  
    // Retornar os dados originais caso o filtro não seja 'musica'
    return data;
  };

  const filteredData = () => {
    let filteredData = dbData;
    if (filters.estacao || filters.topFilter) {
      if (filters.estacao) filteredData = filterEstacao(filteredData);
      if (filters.topFilter) filteredData = filterTop(filteredData);
    } else {
      filteredData = filterTurno(filteredData);
    }

    return mapToChart(filteredData);
  };

  useEffect(() => {
    const data = filteredData();
    onChartDataUpdate(data); // Envia os dados para o componente pai
  }, [filters, dbData, onChartDataUpdate]);  // Dependências que acionam a atualização

  return (
    <div>
      <PieChart data={filteredData()} />
    </div>
  );
};

export default FilteredPieChart;
