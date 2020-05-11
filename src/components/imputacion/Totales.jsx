import React from 'react'
import { Table } from 'semantic-ui-react'

const Totales = (props) => {
    return (
        <Table.Footer>
            <Table.Row>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell className='totales'>Total</Table.Cell>
                <Table.Cell className='totales'>{props.suma}</Table.Cell>
                <Table.Cell></Table.Cell>
            </Table.Row>
        </Table.Footer>
    )
}

export default Totales
