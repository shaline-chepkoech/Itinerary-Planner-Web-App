import React from "react"
import { Link } from "react-router-dom"

const NavBar =()=>{

    return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top ">
  <div className="container-fluid">
    <Link className="navbar-brand" to= "/home">Home</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" to="/" >Itineraries</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/signup">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/login" >Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/create-itinerary"> Create Itinerary</Link>
          </li>
      
        <li className="nav-item">
            <Link className="nav-link active" to="/">Log Out</Link>
           </li>

       <li className="nav-item dropdown">
          <Link className="nav-link active dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false"
          to="/">
            Dropdown Link
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/">Action</Link></li>
            <li><Link className="dropdown-item" to="/">Another action</Link></li>
            <li><Link className="dropdown-item" to="/">Something else here</Link></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
    )
}

export default NavBar
