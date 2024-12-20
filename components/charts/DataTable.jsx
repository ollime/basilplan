import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

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
    ]
    const pagination = true;
    const paginationPageSizeSelector = [100, 300, 500, 1000]
    const paginationPageSize = 300;

    return (
        <>
            <div className="ag-theme-quartz table-container" style={{height: 500}}>
            <AgGridReact
                rowData={data}
                columnDefs={colDefs}
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                paginationPageSizeSelector={paginationPageSizeSelector}
            />
            </div>
        </>
    )
}

export default DataTable;