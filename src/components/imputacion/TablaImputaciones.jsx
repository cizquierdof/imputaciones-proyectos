import React, { Component } from 'react'
import { Segment, Label, Table, Grid, Header, Icon, Tab } from 'semantic-ui-react'
import './TablaImputaciones.css'

export class TablaImputaciones extends Component {

    constructor(props) {
        super(props);
        this.state = {
            saldo: 0,
            sumaIngresos: 0,
            sumaGastos: 0
        }
    }

    TableBody = (props) => {

        return (
            <Table.Body>
                {
                    props.imputaciones.filter(
                        res => res.tipo === props.tipo
                    ).map(
                        (items, index) =>
                            (
                                <Table.Row key={index}>
                                <Table.Cell>{(props.tipo==='ingresos')&&<Icon link color='purple' name='angle double left'/>}</Table.Cell>

                                    <Table.Cell>{items.fecha}</Table.Cell>
                                    <Table.Cell>{items.concepto}</Table.Cell>
                                    <Table.Cell>{items.importe} </Table.Cell>
                                    <Table.Cell>{(props.tipo==='gastos')&&<Icon link color='green' name='angle double right'/>}</Table.Cell>
                                </Table.Row>
                            )
                    )
                }
            </Table.Body>
        )
    }

    TableTotales = (props) => {
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

    CabeceraTabla = () => {
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

    componentDidUpdate(prevProps, prevState) {
        //console.log('saldo',this.state.saldo)
        if (this.props.imputaciones !== prevProps.imputaciones) {
            const sumaIngresos = this.props.imputaciones.filter(
                res => res.tipo === 'ingresos'
            ).reduce(
                (acumulador, { importe }) => acumulador + parseFloat(importe), 0
            );

            const sumaGastos = this.props.imputaciones.filter(
                res => res.tipo === 'gastos'
            ).reduce(
                (acumulador, { importe }) => acumulador + parseFloat(importe), 0
            );

            this.setState({
                sumaGastos: sumaGastos,
                sumaIngresos: sumaIngresos,
                saldo: sumaIngresos - sumaGastos
            })
        }
    }

    render() {

        return (
            <Segment raised>
            <Header as='h2' textAlign='right' block color={this.state.saldo>0?'green':'red'}>
                    Saldo= {this.state.saldo}
            </Header>
                <Grid columns={2} divided>
                    <Grid.Column>
                        <Label color='red' ribbon>GASTOS</Label>
                        <Table celled unstackable color='purple'>
                        <this.CabeceraTabla/>
                            <this.TableBody imputaciones={this.props.imputaciones} tipo='gastos' />
                            <this.TableTotales suma={this.state.sumaGastos} />
                        </Table>
                    </Grid.Column>
                    <Grid.Column>
                        <Label color='blue' ribbon>INGRESOS</Label>
                        <Table celled color='green'>
                        <this.CabeceraTabla/>
                            <this.TableBody imputaciones={this.props.imputaciones} tipo='ingresos' />
                            <this.TableTotales suma={this.state.sumaIngresos} />
                        </Table>
                    </Grid.Column>

                </Grid>
            </Segment>
        )

    }
}
export default TablaImputaciones
