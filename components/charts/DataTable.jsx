import { AgGridReact } from "ag-grid-react";
import { colorSchemeDark, themeQuartz } from "ag-grid-community";

function DataTable(props) {
  const data = props.data;
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
  const pagination = true;
  const paginationPageSizeSelector = [100, 300, 500, 1000];
  const paginationPageSize = 300;

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
