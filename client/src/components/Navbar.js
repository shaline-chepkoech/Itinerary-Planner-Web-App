import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from'react-bootstrap/Navbar';
import Nav from'react-bootstrap/Nav';
import { Link } from "react-router-dom"
import { useAuth, logout } from "../auth"

const LoggedInLinks = ()=>{
  return(    
      <>
      <li className="nav-item">
      <button className="nav-link active" onClick={()=>{logout()}}>Log Out</button>
           </li>
           <li className="nav-item">
        <Link className="nav-link" to="/">Home</Link>
      </li>

           <li className="nav-item">
          <Link className="nav-link" to="/create-itinerary"> Create Itinerary</Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link active" to="/" >Itineraries</Link>
        </li>

      </>
    
  )
}

const LoggedOutLinks = ()=>{
  return(
   
    <>
   <li className="nav-item">
        <Link className="nav-link" to="/home">Home</Link>
      </li>
    <li className="nav-item">
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login" >Login</Link>
        </li>
    </>
  );
};


const NavBar =()=>{

  const [ logged ] = useAuth();
  const [expanded, setExpanded] = useState(false);

    return (
<Navbar expanded={expanded} bg="dark" variant="dark" expand="lg" onToggle={() => setExpanded(!expanded)}>
<Container>
    
<Navbar.Brand as={Link} to="/">Navigate</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            {logged ? (
              // Show LoggedInLink if logged in
              <LoggedInLinks />
            ) : (
              // Show LoggedOutLink if not logged in
              <LoggedOutLinks />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>
  );
};

export default NavBar;
