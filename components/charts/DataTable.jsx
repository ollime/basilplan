/** @file Displays log data in a table. */
import { colorSchemeDark, themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

/** Displays log data in a table.
 *
 * @param {Object} props.data log data
 */
function DataTable(props) {
  const data = props.data;

  // table column definition
  const colDefs = [
    {
      field: "date",
      filter: "agDateColumnFilter",
      flex: 1
    },
    {
      field: "task_name",
      filter: true,
      flex: 2
    },
    {
      field: "minutes",
      filter: "agNumberColumnFilter",
      flex: 1
    }
  ];

  // settings for pages at the bottom of the table
  const pagination = true;
  const paginationPageSizeSelector = [100, 300, 500, 1000];
  const paginationPageSize = 300;

  // dark mode
  const myTheme = themeQuartz.withPart(colorSchemeDark);

  return (
    <>
      <div className="ag-theme-quartz table-container" style={{ height: 500 }}>
        <AgGridReact
          rowData={data}
          columnDefs={colDefs}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          theme={myTheme}
        />
      </div>
    </>
  );
}

export default DataTable;
