
const TableBody = ({ tableData, columns }) => {
  return (
    <tbody>
      {tableData.map((data, index) => {
        return (
          <tr key={data?._id + index}>
            {columns.map(({ accessor, Cell }, aIndex) => {
              const tData = data[accessor] ? data[accessor] : "——";
              return <td key={accessor + aIndex}>{Cell ? <Cell data={data} /> : tData}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;