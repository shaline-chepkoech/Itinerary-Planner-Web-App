import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAuth } from "./auth";
import Itinerary from "./Itinerary";


const LoggedinHome = () => {
  const [itineraries, setItineraries] = useState([]);
  const [show, setShow] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [itineraryId, setItineraryId] = useState(0); 

  useEffect(() => {
    getAllItineraries();
  }, []);

  const getAllItineraries = () => {
    fetch('https://backend-1-hpyb.onrender.com/itinerary/itinerary')
      .then((res) => res.json())
      .then(data => setItineraries(data))
      .catch(err => console.error("Error fetching itineraries:", err));
  };

  const closeModal = () => setShow(false);

  const showModal = (id) => {
    setItineraryId(id);
    setShow(true);
    
    const itinerary = itineraries.find(itinerary => itinerary.id === id);
    if (itinerary) {
      setValue('title', itinerary.title);
      setValue('destination', itinerary.destination);
      setValue('details', itinerary.details);
      setValue('date', itinerary.date);
    }
  };

  const updateItinerary = (data) => {
    console.log("Updating itinerary:", data);
    
    let token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
    let access_token = "";
  
    if (token) {
      try {
        const parsedToken = JSON.parse(token);
        access_token = parsedToken.access_token;
      } catch (error) {
        console.error("Error parsing token:", error);
        return;
      }
    }
  
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(data),
    };
  
    fetch(`https://backend-1-hpyb.onrender.com/itinerary/itinerary/${itineraryId}`, requestOptions)
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(`Error: ${res.status} - ${text}`);
          });
        }
        return res.json(); // Only parse JSON if response is valid
      })
      .then((data) => {
        console.log("Updated itinerary data:", data);
        getAllItineraries();
        closeModal();
      })
      .catch((err) => console.error("Error updating itinerary:", err));
  };
  


  const deleteItinerary = () => {
    console.log("Deleting itinerary with ID:", itineraryId);
    let token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
    let access_token = "";

    if (token) {
      try {
        const parsedToken = JSON.parse(token);
        access_token = parsedToken.access_token;
      } catch (error) {
        console.error("Error parsing token:", error);
        return;
      }
    }

    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    };

    fetch(`https://backend-1-hpyb.onrender.com/itinerary/itinerary/${itineraryId}`, requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete itinerary");
        }
        return res.text(); 
      })
      .then(() => {
        console.log("Itinerary deleted successfully");
        getAllItineraries();
        closeModal();
      })
      .catch((err) => console.error("Error deleting itinerary:", err));
  };

  return (
    <div className="itineraries container"
    style={{
      backgroundImage: "url('/images/background.png')", 
      backgroundSize: "cover", 
      backgroundPosition: "center",
      height: "100vh"
    }}
    >
      <Modal show={show} size="lg" onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Itinerary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" {...register('title', { required: true, maxLength: 50 })} />
              {errors.title && <p style={{ color: 'red' }}><small>Title is required</small></p>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Destination</Form.Label>
              <Form.Control type="text" placeholder="Enter destination" {...register('destination', { required: true })} />
              {errors.destination && <p style={{ color: 'red' }}><small>Destination is required</small></p>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Details</Form.Label>
              <Form.Control as="textarea" rows={5} placeholder="Enter details" {...register('details', { required: true })} />
              {errors.details && <p style={{ color: 'red' }}><small>Details are required</small></p>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" {...register('date', { required: true })} />
              {errors.date && <p style={{ color: 'red' }}><small>Date is required</small></p>}
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit(updateItinerary)}>Update Itinerary</Button>
            <Button variant="danger" className="ms-2" onClick={deleteItinerary}>Delete</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <h1>List of Itineraries</h1>
      {Array.isArray(itineraries) && itineraries.length > 0 ? (
        itineraries.map((itinerary) => (
          <Itinerary 
            key={itinerary.id} 
            title={itinerary.title} 
            destination={itinerary.destination} 
            date={itinerary.date} 
            description={itinerary.details} 
            onClick={() => showModal(itinerary.id)} 
            onDelete={() => deleteItinerary(itinerary.id)} 
          />
        ))
      ) : (
        <p>No itineraries available.</p>
      )}
    </div>
  );
};


const LoggedoutHome = () => {
  return (
    <div className="home container"
    style={{
      backgroundImage: "url('/images/background.png')", 
      backgroundSize: "cover", 
      backgroundPosition: "center",
      height: "100vh"
    }}
    >
      <h1>Welcome to Itinerary Planner Page</h1>
      <p>Sign in to view your itineraries or Sign Up to start planning</p>
      <Link to='/signup' className="btn btn-primary">Get Started</Link>
    </div>
  );
};

const HomePage = () => {
  const [logged] = useAuth();

  return (
    <div>
      {logged ? <LoggedinHome /> : <LoggedoutHome />}
    </div>
  );
};

export default HomePage;
