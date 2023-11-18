import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { useSortableTable } from "./useSortableTable";

import './table.css';

const Table = ({ data = [], columns = [] }) => {
  const [tableData, handleSorting] = useSortableTable(data, columns);

  return (
    <>
      {!tableData.length ? <p className="no-results-message">No results to show!!!</p> :
        (
          <table className="table">
            <TableHead {...{ columns, handleSorting }} />
            <TableBody {...{ columns, tableData }} />
          </table>
        )
      }
    </>
  );
};

export default Table;