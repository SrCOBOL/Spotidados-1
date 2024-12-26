import React from 'react';
import ReactEcharts from 'echarts-for-react';

const PieChart = () => {
  // Configuração do gráfico
  const options = {
    title: {
      text: 'Quando é que o utilizador mais ouve música? (horas do dia)',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Acesso à Internet',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'x' },
          { value: 735, name: 'c' },
          { value: 580, name: 'b' },
          { value: 484, name: 'a' },
          { value: 300, name: 'd' },
        ],
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