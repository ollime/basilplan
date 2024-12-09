import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

function DataTable(props) {
    const data = props.data;
    const colDefs = [
        {field: "date", flex: 1},
        {field: "task_name", flex: 2},
        {field: "minutes", flex: 1}
    ]
    const pagination = true;
    const paginationPageSize = 300;

    return (
        <>
            <div className="ag-theme-quartz table-container" style={{height: 500}}>
            <AgGridReact
                rowData={data}
                columnDefs={colDefs}
                pagination={pagination}
                paginationPageSize={paginationPageSize}
            />
            </div>
        </>
    )
}

export default DataTable;