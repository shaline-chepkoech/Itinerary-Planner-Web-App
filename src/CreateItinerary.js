import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

const CreateItineraryPage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const createItinerary = (data) => {
    console.log("Form Data:", data);

    const tokenString = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
    if (!tokenString) {
      console.log("Token not found in local storage");
      return;
    }

    try {
      const parsedToken = JSON.parse(tokenString);
      const access_token = parsedToken.access_token;

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(data),
      };

      fetch("https://backend-k0ku.onrender.com/itinerary/itinerary", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          console.log("Response:", data);
          reset();
        })
        .catch((err) => console.error("Error:", err));

    } catch (error) {
      console.error("Error parsing token:", error);
    }
  };

  return (
    <div className="container">
      <h1>Create an Itinerary</h1>
      <Form onSubmit={handleSubmit(createItinerary)}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter title" 
            {...register("title", { required: true, maxLength: 50 })} 
          />
          {errors.title && <p style={{ color: "red" }}><small>Title is required</small></p>}
        </Form.Group>

        <Form.Group controlId="user_id">
          <Form.Label>User ID</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Enter user ID" 
            {...register("user_id", { required: true })} 
          />
          {errors.user_id && <p style={{ color: "red" }}><small>User ID is required</small></p>}
        </Form.Group>

        <Form.Group controlId="destination">
          <Form.Label>Destination</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter destination" 
            {...register("destination", { required: true })} 
          />
          {errors.destination && <p style={{ color: "red" }}><small>Destination is required</small></p>}
        </Form.Group>

        <Form.Group controlId="details">
          <Form.Label>Details</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={5} 
            placeholder="Enter details" 
            {...register("details", { required: true })} 
          />
          {errors.details && <p style={{ color: "red" }}><small>Details are required</small></p>}
        </Form.Group>

        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control 
            type="date" 
            {...register("date", { required: true })} 
          />
          {errors.date && <p style={{ color: "red" }}><small>Date is required</small></p>}
        </Form.Group>

        <Button variant="primary" type="submit">Save</Button>
      </Form>
    </div>
  );
};

export default CreateItineraryPage;
