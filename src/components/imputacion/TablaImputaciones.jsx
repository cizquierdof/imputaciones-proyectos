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
            sumaIngresos: 0,
            sumaGastos: 0,
            datosImputaciones: []
        }
    }

    cambiaTipoImputacion = (tipo, id) => {

        console.log('proyecto', this.props.proyecto);
        console.log('doc imputacion', id);
        console.log('tipo', tipo)

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
            sumaGastos:this.total('gastos'),
            sumaIngresos: this.total('ingresos')

        })
    }



    borraImputacion = (id) => {
        console.log('borra imputacion', id);
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
             sumaGastos:this.total('gastos'),
             sumaIngresos: this.total('ingresos'),

            })

    }

    /***********************
     * calcula la suma total de las imputaciones en fución del tipo de imputación que le pasemos
     */

    total = (tipo) => {
        //console.log('gastos',this.props.imputaciones[0])
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

    /***************
     * 
     * recupera el array de imputaciones del proyecto
     * 
     */

    recuperaImputaciones = () => {
        db.collection('projects').doc(this.props.proyecto).collection('imputaciones').get().then(

            res => {
                const imputacionesDocs = res.docs.map(
                    item => {

                        return {
                            idImputacion: item.id,
                            data: item.data()
                        };
                    }
                )
                this.setState({
                    datosImputaciones: imputacionesDocs
                })
            }
        )
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state === prevState) {

            this.setState({
                sumaGastos: this.total('gastos'),
                sumaIngresos: this.total('ingresos'),
            })
        }
    }

    componentDidMount() {

        this.recuperaImputaciones();

        this.setState({
            sumaGastos: this.total('gastos'),
            sumaIngresos: this.total('ingresos'),
        })

    }

    render() {
        const datosTarta=[
            {name:'Gastos', value:this.state.sumaGastos},
            {name:'Ingresos',value:this.state.sumaIngresos}
        ]
        //console.log(datosTarta)
        const saldo = this.state.sumaIngresos - this.state.sumaGastos
        return (
            <Segment raised>
                <Header as='h2' textAlign='right' block color={saldo > 0 ? 'blue' : 'red'}>
                    Saldo= {saldo}
                </Header>
                <Grid columns={12} divided>
                    <Grid.Column width={3} >
                        <Label color='teal' ribbon>DISTRIBUCIÓN</Label>

                            <Tarta data={datosTarta}/>
                    </Grid.Column>
                    <Grid.Column width={6} >
                        <Label color='red' ribbon>GASTOS</Label>
                        <Table celled unstackable color='red'>
                            <CabeceraTabla />
                            <FilasTabla imputaciones={this.state.datosImputaciones} tipo='gastos'
                                cambiaTipo={this.cambiaTipoImputacion} borrar={this.borraImputacion} />
                            <Totales suma={this.state.sumaGastos} />
                        </Table>
                    </Grid.Column>
                    <Grid.Column width={6} >
                        <Label color='blue' ribbon>INGRESOS</Label>
                        <Table celled unstackable color='blue'>
                            <CabeceraTabla />
                            <FilasTabla imputaciones={this.state.datosImputaciones} tipo='ingresos'
                                cambiaTipo={this.cambiaTipoImputacion} borrar={this.borraImputacion} />
                            <Totales suma={this.state.sumaIngresos} />
                        </Table>
                    </Grid.Column>

                </Grid>
            </Segment>
        )

    }
}
export default TablaImputaciones
