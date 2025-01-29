import React from "react";
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const CreateItinerary = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (formData) => {
        const data = {
            title: formData.title,
            user_id: formData.user_id,  
            destination: formData.destination, 
            details: formData.details,
            date: formData.date
        };

        console.log(data);

        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY')?.replace(/"/g, '');
        console.log(token);

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        };

        fetch('http://localhost:5000/itinerary/itinerary', requestOptions)
            .then(res => res.json())
            .then(data => { console.log(data); reset(); })
            .catch(err => console.log(err));
    };

    return (
        <div className="container">
            <h1>Create an Itinerary</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
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
                
                <Button variant="primary" type="submit">Save</Button>
            </Form>
        </div>
    );
};

export default CreateItinerary;
