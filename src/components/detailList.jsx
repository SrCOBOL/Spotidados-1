import React from 'react';

const DetailList = ({ filters }) => {
  const data = [
    { estacao: 'Verão', reproducoes: '04:01' },
    { estacao: 'Inverno', reproducoes: '04:01' },
    { estacao: 'Outono', reproducoes: '04:01' },
    { estacao: 'Primavera', reproducoes: '04:01' },
  ];

  return (
    <table style={{ width: '80%', margin: '20px auto', backgroundColor: '#333', color: '#fff', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Estação</th>
          <th>Reproduções</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} style={{ textAlign: 'center' }}>
            <td>{item.estacao}</td>
            <td>{item.reproducoes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DetailList;
