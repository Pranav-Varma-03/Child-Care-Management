import React from "react";

const TableComponentMonth = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Month</th>
          <th>Present</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.month}>
            <td>{row.month}</td>
            <td>{row.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponentMonth;
