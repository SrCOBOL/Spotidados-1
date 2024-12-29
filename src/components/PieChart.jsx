//modelo grafico pizza

import React from 'react';
import ReactEcharts from 'echarts-for-react';

const PieChart = ({ data }) => {
  // Configuração do gráfico
  const options = {
    title: {
      text: 'Estatísticas de Reprodução',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'horizontal',
      top: 'bottom',
      left: 'center',
    },
    series: [
      {
        name: 'Reproduções',
        type: 'pie',
        radius: '50%',
        data: data.map((item) => ({
          value: item.value,
          name: item.name,
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return <ReactEcharts option={options} style={{ height: '400px', width: '100%' }} />;
};

export default PieChart;