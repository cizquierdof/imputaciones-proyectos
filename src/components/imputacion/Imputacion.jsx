import React, { Component } from 'react'
import { DateInput } from 'semantic-ui-calendar-react';
import 'moment/locale/es'
import { Form, Button, Label } from 'semantic-ui-react';

export class Imputacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            concepto: '',
            importe: '',
            tipo: ''
        }
    }

    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }

    datePicker = () => {
        return (
            <DateInput name="date"
                placeholder="Fecha"
                value={this.state.date}
                iconPosition="left"
                onChange={this.handleChange}
                localization='es'
                popupPosition='left'
            />
        )
    }

    onChangeConcepto = (e) => {
        this.setState({
            concepto: e.target.value
        })
    }
    onChangeImporte = (e) => {
        this.setState({
            importe: e.target.value
        })
    }
    onChangeTipo = (e,res) => {
        const {value}=res
        this.setState({
            tipo: value
        })
    }

    render() {
        
        const options = [
            { key: 'g', text: 'gastos', value: 'gastos' },
            { key: 'i', text: 'ingresos', value: 'ingresos' }
        ]

        const imputacion={
            concepto:this.state.concepto,
            importe:this.state.importe,
            tipo:this.state.tipo,
            fecha:this.state.date
        }
        //console.log('imputacion', imputacion)


        return (
            <Form>
                <Label color='teal' ribbon>Imputaciones</Label>
                <Form.Group unstackable widths={2}>
                    <Form.Input label='Concepto' placeholder='Concepto'
                        value={this.state.concepto} onChange={this.onChangeConcepto} />
                    <Form.Input label='Importe' placeholder='Importe' 
                        value={this.state.importe} onChange={this.onChangeImporte}/>
                </Form.Group>
                <Form.Group unstackable widths={2}>
                    <Form.Select label='Tipo' options={options} placeholder='Tipo' value={this.state.tipo} 
                       onChange={this.onChangeTipo} />
                    <Form.Input label='Fecha' control={this.datePicker} />
                </Form.Group>
                {
                    this.props.imputar&&<Button onClick={() => this.props.guardarImputacion(imputacion)}>Guardar</Button>
                }
                
            </Form>
        )
    }
}

export default Imputacion
