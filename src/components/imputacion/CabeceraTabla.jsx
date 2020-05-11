import React from 'react'
import { Table } from 'semantic-ui-react'

const CabeceraTabla = () => {
    return (
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell>Fecha</Table.HeaderCell>
                <Table.HeaderCell>Concepto</Table.HeaderCell>
                <Table.HeaderCell>Importe</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
        </Table.Header>
    )
}

export default CabeceraTabla
