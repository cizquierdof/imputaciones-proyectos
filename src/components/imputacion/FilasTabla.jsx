import React from 'react'
import { Table, Icon } from 'semantic-ui-react'

const FilasTabla = (props) => {

    const dobleClickHandler=()=>{
        console.log('doble click');
    }

    return (
        <Table.Body>
        {
            props.imputaciones.filter(
                (res) => res.data.tipo === props.tipo
            ).map(
                (items, index) =>
                    (
                        <Table.Row key={index}>
                            <Table.Cell onDoubleClick={dobleClickHandler}>
                                {
                                   ( (props.tipo === 'ingresos')
                                    && <Icon link color='purple' name='arrow left'
                                        onClick={()=>props.cambiaTipo('gastos',items.idImputacion)} 
                                         />)||<Icon link color='purple' name='trash'
                                         onClick={()=>props.borrar(items.idImputacion)}
                                         />
                                        }
                            </Table.Cell>
                            <Table.Cell>{items.data.fecha}</Table.Cell>
                            <Table.Cell>{items.data.concepto}</Table.Cell>
                            <Table.Cell>{items.data.importe} </Table.Cell>
                            <Table.Cell>
                                {
                                    ((props.tipo === 'gastos')
                                    && <Icon link color='blue' name='arrow right'
                                        onClick={()=>props.cambiaTipo('ingresos',items.idImputacion)} 
                                         />)||<Icon link color='purple' name='trash'
                                         onClick={()=>props.borrar(items.idImputacion)}
                                         />
                                        }
                            </Table.Cell>
                        </Table.Row>
                    )
            )
        }
    </Table.Body>
)
}

export default FilasTabla
