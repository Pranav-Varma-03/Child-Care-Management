import React from "react";

const TableComponentWeek = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Week</th>
          <th>Present</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.week}>
            <td>{row.week}</td>
            <td>{row.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponentWeek;
