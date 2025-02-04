import React, {useState} from "react";
import {Form,Button, Alert} from 'react-bootstrap'
import { Link } from "react-router-dom"
import {useForm} from 'react-hook-form'


const SignUpPage =()=>{

    const {register, handleSubmit,reset, formState: {errors}} = useForm();
    const [show, setShow] = useState(false);

    const [serverResponse, setServerResponse] = useState('')

    const submitForm = (data) => {

      if (data.password === data.confirmPassword){

        const body={
            username: data.username,
            email: data.email,
            password: data.password
        }

      const requestOPtions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }

      fetch('https://backend-k0ku.onrender.com/auth/signup', requestOPtions)
       .then(response => response.json())
       .then(data => {
        setServerResponse(data.message)
        console.log(serverResponse)
          console.log(data);
          //alert("Registration Successful")

          setShow(true);
        })
        .catch(error => console.error('Error:', error));

      reset()

    }
    else{
      alert("Passwords do not match")
    }

}
    
  

    return (
        <div className="container">
            <div className="form">
               
          {show?
          <>
          <Alert variant="success" onClose={() => setShow(false)} dismissible>
                
                <p>
               {serverResponse}
                </p>
              </Alert>
           <h1>Sign Up Page</h1>
                
              </>
              :
              <h1>Sign Up Page</h1>

          }
                <form onSubmit={handleSubmit(submitForm)}>
                     <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Your username"
                        {...register("username",{required:true, maxLength:100})} 
                        />
                        
                        {errors.username && <p style={{color:"red"}}><small>Username is required</small></p>}

                     </Form.Group>
                     <br></br>
                     <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Your email"
                        {...register("email",{required:true, maxLength:100})}
                        />
                        
                        {errors.email && <p style={{color:"red"}}><small>Email is required</small></p>}
                     </Form.Group>
                     <br></br>
                     <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Create pasword" 
                        {...register("password",{required:true, minLength:8})}
                         
                         />
                         
                         {errors.password && <p style={{color:"red"}}><small>Password is required and must be at least 8 characters long</small></p>}
                     </Form.Group>
                     <br></br>
                     <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Your password"
                         {...register("confirmPassword",{required:true, minLength:8})}
                        />
                         
                         {errors.confirmPassword && <p style={{color:"red"}}><small>Passwords do not match</small></p>}
                     </Form.Group>
                     <br></br>
                     <Form.Group>
                        <Button variant="primary" type="submit" onClick={handleSubmit(submitForm)}>
                            Sign Up
                        </Button>
                     </Form.Group> 
                     <br></br>
                     <Form.Group>
                            <small>
                              Already have an account? <Link to="/login">Login</Link>
                            </small> 
                         </Form.Group>
                </form>
            </div>
        </div>
    )

}

export default SignUpPage;