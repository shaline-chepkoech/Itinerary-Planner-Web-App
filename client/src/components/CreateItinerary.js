import React from "react";
import { Form, Button } from'react-bootstrap';
import {useForm} from 'react-hook-form'


const CreateItinerary =()=>{

    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    return (
        <div className="container">
            <h1>Create an Itinerary</h1>
            <Form>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title"
                    {...register('title', {required: true, maxLength:50})}
                    
                    />
                </Form.Group>
                {errors.title && <p style={{ color: 'red' }}><small>Title is required</small></p>}
                    {errors.title?.type === "maxLength" && <p style={{ color: 'red' }}><small>Title should be less than 50 characters</small></p>}
                    <br />

                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={5} placeholder="Enter description"
                    {...register('description', {required: true, maxLength:500})}
                    
                    />
                </Form.Group>
                {errors.description && <p style={{ color: 'red' }}><small>Description is required</small></p>}
                {errors.description?.type === "maxLength" && <p style={{ color: 'red' }}><small>Description should be less than 500 characters</small></p>}
                <br></br>

                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
            
        </div>
    )

}

export default CreateItinerary;