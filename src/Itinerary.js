import React from 'react';
import { Button, Card, Modal } from 'react-bootstrap';

const Itinerary = ({ title, destination, date, description, onClick, onDelete }) => {

    return (
    <Card className="itinerary" onClick={onClick}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{destination}</Card.Subtitle>
        <Card.Text>
          <strong>Date:</strong> {date}
        </Card.Text>
        <Card.Text>{description}</Card.Text>
        <Button variant='primary' onClick={onClick}>Update</Button>
        <Button variant='danger' onClick={onDelete}>Delete</Button>
      </Card.Body>
    </Card>
    )
};

export default Itinerary;
