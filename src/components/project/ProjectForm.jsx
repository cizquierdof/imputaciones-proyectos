import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import db from '../../config/firebase'

export class ProjectForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            description: "",
            client: "",
            redirect: false,
            clientes: [],
            currentClient: '-1'
        }
    }

    componentDidMount() {

        db.collection('clients').get().then(
            res => {
                //console.log(res.docs)
                const docs = res.docs.map(
                    item => {
                        const data = item.data();
                        return {
                            id: item.id,
                            name: data.name
                        }
                    }
                )
                this.setState({
                    clientes: docs
                })
            }
        )


        const id = this.props.id;
        if (id) {
            db.collection('projects').doc(this.props.id).get().then(
                res => {
                    if (res.exists) {
                        const data = res.data();
                        this.setState({
                            code: data.code,
                            description: data.description,
                            client: data.client
                        })
                    }
                }
            )
        }
    }

    onClientChange = e => {
        this.setState(
            {
                client: e.target.value
            }
        )
    }

    onDescriptionChange = e => {
        this.setState(
            {
                description: e.target.value
            }
        )
    }

    onCodeChange = e => {
        this.setState(
            {
                code: e.target.value
            }
        )
    }

    onSubmitClick = e => {
        e.preventDefault();
        if (this.state.currentClient !== '-1') {
            const project = {
                code: this.state.code,
                description: this.state.description,
                client: this.state.currentClient
            }
            if (this.props.id) {
                db.collection('projects').doc(this.props.id).set(project)
                    .then(
                        res => this.setState({
                            redirect: true
                        })
                    ).catch(console.log)

            } else {
                db.collection('projects').add(project).then(
                    res => this.setState({
                        redirect: true
                    })
                ).catch(console.log)
            }
        } else alert('Debe elegir un cliente')
    }

    onClientChange = e => {
        //console.log(e.target.value)
        this.setState({
            currentClient: e.target.value
        })

    }

    render() {
        return (
            <div className="project-form">
                {this.state.redirect && <Redirect to="/projects" />}
                <form className="ui form" >
                    <div className="field">
                        <label>Ćodigo de proyecto</label>
                        <input type="text" name="code" placeholder="Código de proyecto"
                            onChange={this.onCodeChange} value={this.state.code}/>
                    </div>
                    <div className="field">
                        <label>Descripción</label>
                        <input type="text" name="description" placeholder="Descripción"
                            value={this.state.description} onChange={this.onDescriptionChange}/>
                    </div>
                    <div className="field">
                        <label>Cliente</label>
                        <select onChange={this.onClientChange} value={this.state.currentClient}>
                            <option value={-1}>Elegir cliente</option>
                            {this.state.clientes.map(
                                item => <option key={item.id} value={item.id}>{item.name}</option>
                            )}
                        </select>
                    </div>

                    <Link to="/projects/" className="ui red button">
                        <i className="icon close"></i>
                        Cancelar
                     </Link>
                    <button className="ui primary button" onClick={this.onSubmitClick}>
                        Enviar
                    </button>
                </form>
            </div>
        )
    }
}

export default ProjectForm
