import React, { useState } from "react";
import {Form,Button } from 'react-bootstrap'
import { Link } from "react-router-dom"
import {useForm} from 'react-hook-form'
import { login } from "../auth";
import { useHistory } from "react-router-dom";


const LoginPage =()=>{

    const {register, handleSubmit,reset, formState: {errors}} = useForm();

    const history = useHistory();
   
    const loginUser = (data) => {
        
     console.log(data);
     console.log('Login data:', data);
    console.log('Accessing localStorage to store token');
    login(data.access_token);

     const requestOPtions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }

      fetch('/auth/login', requestOPtions)
       .then(response => response.json())
       .then(data => {
        if (data.access_token) {
            login(data.access_token)
            history.push('/home');
       }else {
        console.error('Login failed:', data.message);
    }
  })
  .catch((error) => console.error('Error:', error));
    

       

     reset();
       
    };
        return (
            <div className="container">
                <div className="form">
                    <h1>Login Page</h1>
                    <form>
                         <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Your username"
                            {...register('username', {required: true, maxLength:25})}
                            />
                         </Form.Group>
                        {errors.username && <p style={{color: 'red'}}><small>Username is required</small></p>}
                        {errors.username?.type === "maxLength" && <p style={{color: 'red'}}><small>Username should be 25 characters</small></p>}
                         <br></br>
                         <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Your pasword" 
                             {...register('password', {required: true, minLength:8})}
                             
                             />
                         </Form.Group>
                         {errors.password && <p style={{color: 'red'}}><small>Password is required</small></p>}
                        {errors.password?.type === "minLength" && <p style={{color: 'red'}}><small>Password should be more than 8 characters</small></p>}
                         <br></br>
                       
    
                         <Form.Group>
                            <Button variant="primary" type="submit" onClick={handleSubmit(loginUser)}>
                                Login
                            </Button>
                         </Form.Group>
                         <br></br>
                         <Form.Group>
                            <small>
                              Do not have an account? <Link to="/signup">SignUp</Link>
                            </small> 
                         </Form.Group>
                    </form>
                </div>
            </div>
        )
    
    }


export default LoginPage;