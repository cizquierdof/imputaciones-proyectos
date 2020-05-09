import React from 'react'
import { Card } from 'semantic-ui-react'

const ProjectCard = props => {




    //console.log("project card", props)
    return (
        <Card>
            <Card.Content>
                <Card.Header>{props.item.code}</Card.Header>
                <Card.Meta>{props.item.client}</Card.Meta>
                <Card.Description>
                    {props.item.description}
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default ProjectCard
