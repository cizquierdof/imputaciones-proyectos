import React, { Component } from 'react'
import { Segment, Label, Table, Grid, Header } from 'semantic-ui-react'
import './TablaImputaciones.css'
import CabeceraTabla from './CabeceraTabla';
import Totales from './Totales';
import db from '../../config/firebase';
import FilasTabla from './FilasTabla';
import Tarta from './Tarta'

export class TablaImputaciones extends Component {


    /******************
     * 
     * recibe: id del proyecto actual
     */

    constructor(props) {
        super(props);
        this.state = {
            datosImputaciones: []
        }
    }

    cambiaTipoImputacion = (tipo, id) => {

        // console.log('proyecto', this.props.proyecto);
        // console.log('doc imputacion', id);
        // console.log('tipo', tipo)

        db.collection('projects').doc(this.props.proyecto).collection('imputaciones').doc(id)
            .update(
                { tipo: tipo }
            )

        const nuevoElemento = this.state.datosImputaciones.filter(
            item => item.idImputacion === id

        )[0]

        nuevoElemento.data.tipo = tipo;

        const nuevasImputaciones = this.state.datosImputaciones.filter(
            item => item.idImputacion !== id

        )

        nuevasImputaciones.push(nuevoElemento);
        this.setState({
            datosImputaciones: nuevasImputaciones,
            sumaGastos: this.total('gastos'),
            sumaIngresos: this.total('ingresos')
        })
    }

    _editableFocus = (texto) => {
        console.log('Texto que hay', texto);
    }

    __editableFocusOut = (texto) => {
        console.log('nievo texto', texto)
    }


    borraImputacion = (id) => {
        //console.log('borra imputacion', id);

        if (window.confirm('¿Borrar? \n No se puede deshacer')) {
            db.collection("projects").doc(this.props.proyecto).collection('imputaciones').doc(id).delete().then(function () {
                console.log("Document successfully deleted!");
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });

            const nuevasImputaciones = this.state.datosImputaciones.filter(
                item => item.idImputacion !== id

            )

            this.setState({
                datosImputaciones: nuevasImputaciones,
                sumaGastos: this.total('gastos'),
                sumaIngresos: this.total('ingresos'),

            })


        }
    }

    /***********************
     * calcula la suma total de las imputaciones en fución del tipo de imputación que le pasemos
     */

    total = (tipo) => {
        //console.log(tipo,this.state.datosImputaciones)
        const suma = this.state.datosImputaciones.filter
            (
                res => res.data.tipo === tipo
            ).map(
                item => item.data.importe
            ).reduce(
                (suma, item) => suma + parseFloat(item), 0
            )
            
        return suma
    }


    componentDidUpdate(prevProps, prevState) {
        //console.log('didupdate',this.props.imputaciones)
        if (this.props !== prevProps) {

                // this.setState({
                //     datosImputaciones:this.props.imputaciones
                // });
            const imputaciones=this.props.imputaciones
            this.setState({
                datosImputaciones:imputaciones
    
            })
        }
    }

    

    componentDidMount() {
        //console.log('didmount',this.props.imputaciones)
        this.setState({
            datosImputaciones:this.props.imputaciones,
        })

    }

    render() {
        const sumaGastos=this.total('gastos');
        const sumaIngresos=this.total('ingresos')
        const datosTarta = [
            { name: 'Gastos', value: sumaGastos },
            { name: 'Ingresos', value: sumaIngresos}
        ]
        //console.log(datosTarta)
        const saldo = sumaIngresos - sumaGastos
        return (
            <Segment raised>
                <Header as='h2' textAlign='right' block color={saldo > 0 ? 'blue' : 'red'}>
                    Saldo= {saldo}
                </Header>
                <Grid columns={12} divided>
                    <Grid.Column width={3} >
                        <Label color='teal' ribbon>DISTRIBUCIÓN</Label>

                        <Tarta data={datosTarta} />
                    </Grid.Column>
                    <Grid.Column width={6} >
                        <Label color='red' ribbon>GASTOS</Label>
                        <Table celled unstackable color='red'>
                            <CabeceraTabla />
                            <FilasTabla imputaciones={this.state.datosImputaciones} tipo='gastos'
                                cambiaTipo={this.cambiaTipoImputacion} borrar={this.borraImputacion}
                                textoAntiguo={this._editableFocus} textoNuevo={this.__editableFocusOut} />
                            <Totales suma={sumaGastos} />
                        </Table>
                    </Grid.Column>
                    <Grid.Column width={6} >
                        <Label color='blue' ribbon>INGRESOS</Label>
                        <Table celled unstackable color='blue'>
                            <CabeceraTabla />
                            <FilasTabla imputaciones={this.state.datosImputaciones} tipo='ingresos'
                                cambiaTipo={this.cambiaTipoImputacion} borrar={this.borraImputacion}
                                textoAntiguo={this._editableFocus} textoNuevo={this.__editableFocusOut} />
                            <Totales suma={sumaIngresos} />
                        </Table>
                    </Grid.Column>

                </Grid>
            </Segment>
        )

    }
}
export default TablaImputaciones
