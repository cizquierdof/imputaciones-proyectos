import React, { Component } from 'react'
import { Segment, Label, Table, Grid, Header, Icon } from 'semantic-ui-react'
import './TablaImputaciones.css'
import CabeceraTabla from './CabeceraTabla';
import Totales from './Totales';
import db from '../../config/firebase';

export class TablaImputaciones extends Component {

    constructor(props) {
        super(props);
        this.state = {
            saldo: 0,
            sumaIngresos: 0,
            sumaGastos: 0,
            redirect: false
        }
    }


    TableBody = (props) => {

        const cambiaTipoImputacion = (data, tipo) => {
            // console.log('todo', data)
            // console.log('proyecto', data.proyecto);
            // console.log('doc imputacion', data.idImputacion);
            // console.log('datos', data.data)
            db.collection('projects').doc(data.proyecto).collection('imputaciones').doc(data.idImputacion)
                .update(
                    { tipo: tipo }
                )

            this.setState({ state: this.state })
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
                                    <Table.Cell>
                                        {(props.tipo === 'ingresos')
                                            && <Icon link color='purple' name='angle double left'
                                                onClick={() => cambiaTipoImputacion(items, 'gastos')} />}
                                    </Table.Cell>
                                    <Table.Cell>{items.data.fecha}</Table.Cell>
                                    <Table.Cell>{items.data.concepto}</Table.Cell>
                                    <Table.Cell>{items.data.importe} </Table.Cell>
                                    <Table.Cell>
                                        {(props.tipo === 'gastos')
                                            && <Icon link color='green' name='angle double right'
                                                onClick={() => cambiaTipoImputacion(items, 'ingresos')} />}
                                    </Table.Cell>
                                </Table.Row>
                            )
                    )
                }
            </Table.Body>
        )
    }


    total = (tipo) => {
        //console.log('gastos',this.props.imputaciones[0])
        const sumaGastos = this.props.imputaciones.filter
        (
            res => res.data.tipo === tipo
        ).map(
            item=> item.data.importe
        ).reduce(
            (suma,item)=> suma+parseFloat(item),0
        )
        return sumaGastos
    }

    componentDidUpdate(prevProps, prevState) {
        //console.log('didupdate',this.state)
        //console.log('saldo',this.state.saldo)
        if (this.state === prevState) {

            const gastos=this.total('gastos');
            const ingresos=this.total('ingresos');
            this.setState({
                sumaGastos: gastos,
                sumaIngresos: ingresos ,
                saldo: this.state.sumaIngresos -this.state.sumaGastos
            })
            //console.log('gastos',this.state.sumaGastos)
        }

        
    }

    componentDidMount(){
        console.log('didmount',this.state)
        this.setState({
            sumaGastos: this.total('gastos'),
            sumaIngresos: this.total('ingresos'),
            saldo: this.state.sumaIngresos -this.state.sumaGastos
        })

    }



    render() {

        return (
            <Segment raised>
                <Header as='h2' textAlign='right' block color={this.state.saldo > 0 ? 'green' : 'red'}>
                    Saldo= {this.state.saldo} 
                </Header>
                <Grid columns={2} divided>
                    <Grid.Column>
                        <Label color='red' ribbon>GASTOS</Label>
                        <Table celled unstackable color='purple'>
                            <CabeceraTabla />
                            <this.TableBody  imputaciones={this.props.imputaciones} tipo='gastos' />
                            <Totales suma={this.state.sumaGastos} />
                        </Table>
                    </Grid.Column>
                    <Grid.Column>
                        <Label color='blue' ribbon>INGRESOS</Label>
                        <Table celled color='green'>
                            <CabeceraTabla />
                            <this.TableBody  imputaciones={this.props.imputaciones} tipo='ingresos' />
                            <Totales suma={this.state.sumaIngresos} />
                        </Table>
                    </Grid.Column>

                </Grid>
            </Segment>
        )

    }
}
export default TablaImputaciones
