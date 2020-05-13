import React from 'react'
import { Table, Icon} from 'semantic-ui-react'
import EditableLabel from '../EditableLabel'

const FilasTabla = (props) => {


    const _handleFocus = (text, id) => {
        console.log('texto viejo', text, props.tipo, id)
    }

    const _handleFocusOut = (text, id) => {
        console.log('texto nuevo', text, id)
    }

    console.log('filas',props.imputaciones)

    return (
        <Table.Body>
            {
                props.imputaciones.filter(
                    (res) => res.data.tipo === props.tipo
                ).map(
                    (items, index) =>
                        (
                            <Table.Row key={index}>
                                <Table.Cell>
                                    {
                                        ((props.tipo === 'ingresos')
                                            && <Icon link color='purple' name='arrow left'
                                                onClick={() => props.cambiaTipo('gastos', items.idImputacion)}
                                            />) || <Icon link color='purple' name='trash'
                                                onClick={() => props.borrar(items.idImputacion)}
                                        />
                                    }
                                </Table.Cell>
                                <Table.Cell>
                                    <EditableLabel text={items.data.fecha}
                                        idImputacion={items.idImputacion}
                                        labelClassName='myLabelClass'
                                        inputClassName='myInputClass'
                                        inputWidth='100px'
                                        inputHeight='25px'
                                        inputMaxLength={25}
                                        labelFontWeight='bold'
                                        inputFontWeight='bold'
                                        onFocus={_handleFocus}
                                        onFocusOut={_handleFocusOut}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <EditableLabel text={items.data.concepto}
                                        idImputacion={items.idImputacion}
                                        labelClassName='myLabelClass'
                                        inputClassName='myInputClass'
                                        inputWidth='100px'
                                        inputHeight='25px'
                                        inputMaxLength={25}
                                        labelFontWeight='bold'
                                        inputFontWeight='bold'
                                        onFocus={_handleFocus}
                                        onFocusOut={_handleFocusOut}
                                    />

                                </Table.Cell>
                                <Table.Cell>
                                    <EditableLabel text={items.data.importe}
                                        idImputacion={items.idImputacion}
                                        labelClassName='myLabelClass'
                                        inputClassName='myInputClass'
                                        inputWidth='100px'
                                        inputHeight='25px'
                                        inputMaxLength={25}
                                        labelFontWeight='bold'
                                        inputFontWeight='bold'
                                        onFocus={_handleFocus}
                                        onFocusOut={_handleFocusOut}
                                    />

                                </Table.Cell>
                                <Table.Cell>
                                    {
                                        ((props.tipo === 'gastos')
                                            && <Icon link color='blue' name='arrow right'
                                                onClick={() => props.cambiaTipo('ingresos', items.idImputacion)}
                                            />) || <Icon link color='purple' name='trash'
                                                onClick={() => props.borrar(items.idImputacion)}
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
