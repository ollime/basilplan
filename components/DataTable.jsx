function DataTable(props) {
    const data = props.data;
    const tableData = data.map((item) => (
        <tr>
            <td>{item.date}</td>
            <td>{item.task_name}</td>
            <td>{item.minutes}</td>
        </tr>
    ))

    return (
        <>
            <table>
                <tr>
                    <td>Date</td>
                    <td>Task</td>
                    <td>Minutes</td>
                </tr>
                {tableData}
            </table>
        </>
    )
}

export default DataTable;