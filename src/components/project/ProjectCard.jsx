import React, { useState, useEffect } from 'react'
import { Card } from 'semantic-ui-react'
import db from '../../config/firebase'

const ProjectCard = props => {


    const [client, setClient] = useState('')

    useEffect(() => {
        //setClient(props.item.client)
        if(props.item.client){
            db.collection('clients').doc(props.item.client).get().then(
                res=>{
                    setClient(res.data().name)
                }
            )
        }
    }, [props])


    //console.log("project card", props)
    return (
        <Card>
            <Card.Content>
                <Card.Header>{props.item.code}</Card.Header>
                <Card.Meta>{client}</Card.Meta>
                <Card.Description>
                    {props.item.description}
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default ProjectCard
