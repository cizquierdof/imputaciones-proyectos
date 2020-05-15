import React from 'react'
import { Table, Icon} from 'semantic-ui-react'
import EditableLabel from '../EditableLabel'

const FilasTabla = (props) => {


    const _handleFocusConcepto = (text, id) => {
        console.log('concepto viejo', text, props.tipo, id)
    }

    const _handleFocusOutConcepto = (text, id) => {
        console.log('concepto nuevo', text, id)
        //props.textoNuevo()
    }
    const _handleFocusImporte = (text, id) => {
        console.log('importe viejo', text, props.tipo, id)
    }

    const _handleFocusOutImporte = (text, id) => {
        console.log('importe nuevo', text, id)
        //props.textoNuevo()
    }
    const _handleFocusFecha = (text, id) => {
        console.log('fecha viejo', text, props.tipo, id)
    }

    const _handleFocusOutFecha = (text, id) => {
        console.log('fecha nuevo', text, id)
        //props.textoNuevo()
    }

    //console.log('filas',props.imputaciones)

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
                                        onFocus={_handleFocusFecha}
                                        onFocusOut={_handleFocusOutFecha}
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
                                        onFocus={_handleFocusConcepto}
                                        onFocusOut={_handleFocusOutConcepto}
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
                                        onFocus={_handleFocusImporte}
                                        onFocusOut={_handleFocusOutImporte}
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
