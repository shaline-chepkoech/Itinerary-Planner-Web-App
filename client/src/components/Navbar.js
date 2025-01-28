import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../auth"

const LoggedInLinks = ()=>{
  return(
    
      <>
     

      <li className="nav-item">
            <Link className="nav-link active" to="/">Log Out</Link>
           </li>

           <li className="nav-item">
          <Link className="nav-link active" to="/create-itinerary"> Create Itinerary</Link>
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
    <Link className="navbar-brand" to= "/home">Home</Link>
    <li className="nav-item">
          <Link className="nav-link active" to="/signup">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/login" >Login</Link>
        </li>

    </>
  


  )
}


const NavBar =()=>{

  const { logged } = useAuth();
  console.log("Logged status:", logged);
  

    return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top ">
  <div className="container-fluid">
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
      {logged ? <LoggedInLinks /> : <LoggedOutLinks />}
               
      
          </ul>
        
      
    </div>
  </div>
</nav>
    )
}

export default NavBar
