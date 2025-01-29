import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom"
import { useAuth } from "../auth"
import Itinerary from "./Itinerary";
import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from'react-hook-form';
import CreateItinerary from "./CreateItinerary";

const LoggedinHome = () => {
    const [itineraries, setItineraries] = useState([]);
    const [show, setShow] = useState(false);
    const {register, reset, handleSubmit, formState:{errors}} = useForm();
  
    useEffect(() => {
      fetch('/itinerary/itinerary')
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setItineraries(data);
        });
    }, []);

    const closeModal = () => setShow(false);

    const showModal =() => {
      setShow(true);
    };
  
    const updateItinerary = (data) => {
      console.log(data);
    }

    return (
      <div className="itineraries container">

<Modal 
        show={show} 
        size="lg"        
        onHide={closeModal}>

      <Modal.Header closeButton>
        <Modal.Title>Update Itinerary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form >
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" {...register('title', { required: true, maxLength: 50 })} />
                    {errors.title && <p style={{ color: 'red' }}><small>Title is required</small></p>}
                </Form.Group>
                
                <Form.Group controlId="user_id">
                    <Form.Label>User ID</Form.Label>
                    <Form.Control type="number" placeholder="Enter user ID" {...register('user_id', { required: true })} />
                    {errors.user_id && <p style={{ color: 'red' }}><small>User ID is required</small></p>}
                </Form.Group>
                
                <Form.Group controlId="destination">
                    <Form.Label>Destination</Form.Label>
                    <Form.Control type="text" placeholder="Enter destination" {...register('destination', { required: true })} />
                    {errors.destination && <p style={{ color: 'red' }}><small>Destination is required</small></p>}
                </Form.Group>
                
                <Form.Group controlId="details">
                    <Form.Label>Details</Form.Label>
                    <Form.Control as="textarea" rows={5} placeholder="Enter details" {...register('details', { required: true })} />
                    {errors.details && <p style={{ color: 'red' }}><small>Details are required</small></p>}
                </Form.Group>
                
                <Form.Group controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" {...register('date', { required: true })} />
                    {errors.date && <p style={{ color: 'red' }}><small>Date is required</small></p>}
                </Form.Group>
                
                <Button variant="primary" onClick={handleSubmit(updateItinerary)}>
                  Update Itinerary

                </Button>
            </Form>
      </Modal.Body>    


        </Modal>

        <h1>List of Itineraries</h1>
  
        {Array.isArray(itineraries) ? (
          itineraries.map((itinerary) => (
            <Itinerary key={itinerary.id} title={itinerary.title} description={itinerary.description} 
            onClick={showModal}
            />
          ))
        ) : (
          <p>No itineraries available.</p> 
        )}
      </div>
    );
  };
  

const LoggedoutHome = ()=>{
    return (
        <div className="home container">
            <h1>Welcome to Itinerary Planner Page</h1>
            <Link to='/signup' className="btn btn-primary">Get Started</Link>
        </div>
        )
        }


const HomePage =()=>{

    const [ logged ] = useAuth();

    return (
        <div>
       { logged ?<LoggedinHome /> :<LoggedoutHome />}
        </div>
           )

}

export default HomePage;