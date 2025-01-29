import React from 'react';
import { Card, Modal } from 'react-bootstrap'

const Itinerary=(title, description)=>{
    return (
        <Card classname="itinerary">
        <Card.Body >
            <Card.Title>{title}</Card.Title>
            <p>{description}</p>
            <Button variant="primary">Update</Button>
            </Card.Body>
            </Card>
    )
}

export default Itinerary;