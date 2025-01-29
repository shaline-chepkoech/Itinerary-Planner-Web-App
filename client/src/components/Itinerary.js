import React from 'react';
import { Card } from 'react-bootstrap'

const Itinerary=(title, description)=>{
    return (
        <Card classname="itinerary">
        <Card.Body >
            <Card.Title>{title}</Card.Title>
            <p>{description}</p>
            </Card.Body>
            </Card>
    )
}

export default Itinerary;