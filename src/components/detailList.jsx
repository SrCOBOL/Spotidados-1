import React from 'react';

const DetailList = ({ filters, grafList }) => {
  if (!filters.topFilter) {
    return
  }

  return (
    <table style={{ width: '80%', margin: '20px auto', backgroundColor: '#333', color: '#fff', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Reproduções</th>
        </tr>
      </thead>
      <tbody>
        {grafList.map((item, index) => (
          <tr key={index} style={{ textAlign: 'center' }}>
            <td>{item.name}</td>
            <td>{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DetailList;
