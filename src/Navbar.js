import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from'react-bootstrap/Navbar';
import Nav from'react-bootstrap/Nav';
import { Link, useNavigate } from "react-router-dom"
import { useAuth, logout } from "./auth"


const LoggedInLinks = ()=>{
  const navigate = useNavigate();

const handleLogout = ()=>{
  logout();
  navigate("/");
  };

  return(   
      <>
<Nav.Link as={Link} to="/" className="text-light">Home</Nav.Link>
      <Nav.Link as={Link} to="/create-itinerary" className="text-light">Create Itineraries</Nav.Link>
      <Nav.Link onClick={handleLogout} className="text-light" style={{ cursor: "pointer" }}>Log Out</Nav.Link>
    </>
    
  )
}

const LoggedOutLinks = ()=>{
  return(
   
    <>
    <Nav.Link as={Link} to="/" className="text-light">Home</Nav.Link>
    <Nav.Link as={Link} to="/signup" className="text-light">Sign Up</Nav.Link>
    <Nav.Link as={Link} to="/login" className="text-light">Login</Nav.Link>
  </>
);
};

const NavBar = () => {
  const [logged] = useAuth();
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar expanded={expanded} bg="dark" variant="dark" expand="lg" onToggle={() => setExpanded(!expanded)}>
      <Container>
        <Navbar.Brand as={Link} to="/">Navigate</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
        <Nav className="ms-auto">
            {logged ? <LoggedInLinks /> : <LoggedOutLinks />}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBar;
