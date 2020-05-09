import React, {useEffect, useState} from 'react'
import ProjectsTable from '../../components/project/ProjectsTable'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import db from '../../config/firebase'

const ProjectList = () => {

    const [projects, setProjects] = useState([]);
    const [clients, setClients]=useState([]);

    useEffect(
        () => {
            //con lo siguiente nos traemos todos los docs de la collection projects
            db.collection('clients').get().then(
                res=>{

                    const docsCliente=res.docs.map(
                        item=>{
                            const data=item.data();
                            return {
                                id: item.id,
                                name: data.name,
                                address:data.address,
                                mail:data.mail
                            }
                        }
                    )
                    setClients(docsCliente);
                }
            )
        }, []
    )
  
    useEffect(
        () => {
            //con lo siguiente nos traemos todos los docs de la collection projects
            db.collection('projects').get().then(
                res=>{

                    const docsProyectos=res.docs.map(
                        item=>{
                            const data=item.data();
                            return {
                                id: item.id,
                                code: data.code,
                                client:data.client,
                                description:data.description
                            }
                        }
                    )
                    setProjects(docsProyectos);
                }
            )            
        }, []
    )

    const deleteElement = (id) => {
        console.log("delete element ",id)
        const nuevosProyectos = projects.filter(
            e => e.id !== id);
        setProjects(nuevosProyectos);
    }

    return (
        <div className="project-list">

                <Header>
                    Lista de Proyectos ({projects.length} proyectos)
                </Header>
                <Link to="/projects/new" className="ui basic button">
                    <i className="icon plus"></i>
                        Nuevo Proyecto
                </Link>
                <ProjectsTable deleteElement={deleteElement} items={projects} cli={clients} />
            </div>
    )
}

export default ProjectList
