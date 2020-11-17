import React from 'react'

const Row1 = ({record}) => {
    const keys = Object.keys(record)
    return (
        <tr key={record.id}>
            {
                keys.map(key => <td key={key}>{record[key]}</td>)
            }
        </tr>
    )
}

const Table = ({data}) => {
    const keys = Object.keys(data[0])
    return(
        <table>
            <thead>
                <tr>
                    {
                        keys.map(key => <th key={key}>{key}</th>)
                    }
                </tr>

            </thead>
            <tbody>
                {data.map(record => <Row1 record = {record} />)}
            </tbody>
        </table>
    )
}

export default Table