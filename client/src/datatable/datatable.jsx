const { Component } = require("react");

export default function Datatable({ data }) {

    const columns = data[0] && Object.keys(data[0]);

    return (
    <div class="table-wrapper">
        <table class ="fl-table">
            <thead>
                <tr>
                    {data[0] && columns.map((heading) => <th>{heading.replace(/_/gi, " ")}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.map(row => <tr>
                    {
                        columns.map(column => <td>{row[column]}</td>)
                    }
                </tr>)}
            </tbody>
        </table>
    </div>
    )
}