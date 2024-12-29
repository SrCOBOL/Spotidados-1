import React from 'react';

const DetailList = ({ filters, grafList }) => {
  if (!filters.topFilter) {
    return
  }

  return (
    <table style={{ width: '100%', margin: '20px auto', backgroundColor: 'rgb(34, 34, 34)', color: '#fff', borderCollapse: 'collapse',fontFamily: "Afacad" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Reproductions</th>
        </tr>
      </thead>
      <tbody>
        {grafList.map((item, index) => (
          <tr key={index} style={{ textAlign: 'center', fontFamily:"Afacad" }}>
            <td>{item.name}</td>
            <td>{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DetailList;
