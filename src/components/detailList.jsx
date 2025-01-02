import React from "react";

const DetailList = ({ filters, grafList }) => {
  if (!filters.topFilter) {
    return null;
  }

  return (
    <table
      style={{
        width: "100%",
        margin: "20px auto",
        backgroundColor: "rgb(34, 34, 34)",
        color: "#fff",
        borderCollapse: "collapse",
        fontFamily: "Afacad",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <thead>
        <tr>
          <th
            style={{
              textAlign: "center",
              padding: "10px",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            Name
          </th>
          <th
            style={{
              textAlign: "center",
              padding: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            Reproductions
          </th>
        </tr>
      </thead>
      <tbody>
        {grafList.map((item, index) => (
          <tr
            key={index}
            style={{
              textAlign: "center",
              borderBottom:
                index === grafList.length - 1 ? "none" : "1px solid white",
            }}
          >
            <td>{item.name}</td>
            <td style={{ padding: "10px" }}>{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DetailList;
