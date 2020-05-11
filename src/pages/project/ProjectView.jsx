import React, { Component } from 'react'
import ProjectCard from '../../components/project/ProjectCard'
import Header from '../../components/Header'
import { Link } from 'react-router-dom'
import db from '../../config/firebase'
import Inputacion from '../../components/imputacion/Imputacion'
import { Button, Segment, SegmentGroup, Label, Container } from 'semantic-ui-react'
import TablaImputaciones from '../../components/imputacion/TablaImputaciones'
import './ProjectView.css'

export class ProjectView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            project: {},
            puedoImputar: false
        }

        this.proyectoActual=this.props.match.params.id
    }

    componentDidMount() {
        //console.log(this.props.match)

        db.collection('projects').doc(this.proyectoActual).get()
            .then(
                res => this.setState({
                    project: res.data()
                })
            )

    }


    onClickImputar = () => {
        this.setState({ puedoImputar: true })
    }

    guardarImputacion = (imputacion) => {
        db.collection('projects').doc(this.proyectoActual).collection('imputaciones').add(imputacion).then(
            res => {
                this.setState({ puedoImputar: false })
            }
        )
    }



    render() {

        return (
            <Container className='contenedor' >
                <Header>Proyecto</Header>
                <SegmentGroup horizontal>
                    <Segment raised>
                        <Label color='teal' ribbon>Proyecto</Label>
                        <ProjectCard item={this.state.project}></ProjectCard>
                        <Link to="/projects" className="ui button">Volver</Link>
                        <Button onClick={e => this.onClickImputar()}>Imputar</Button>
                    </Segment>
                    {
                        //formulario deshabilitado si this.state.imputar = false
                    }
                    <Segment raised disabled={!this.state.puedoImputar}>
                        <Inputacion imputar={this.state.puedoImputar} guardarImputacion={this.guardarImputacion} />
                    </Segment>
                </SegmentGroup>
                <TablaImputaciones proyecto={this.proyectoActual} />
            </Container>
        )
    }
}

export default ProjectView
