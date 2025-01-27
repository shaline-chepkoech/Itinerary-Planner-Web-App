import React from "react";
import { Link } from "react-router-dom"


const HomePage =()=>{

    return (
        <div className="home container">
            <h1 className="heading">Welcome to the Itinerary Planner App</h1>
            <Link to='/signup' className="btn btn-primary">Get Started</Link>
        </div>
    )

}

export default HomePage;