import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom"
import { useAuth } from "../auth"
import Itinerary from "./Itinerary";

const LoggedinHome = () => {
    const [itineraries, setItineraries] = useState([]);
  
    useEffect(() => {
      fetch('/itinerary/itinerary')
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setItineraries(data);
        });
    }, []);
  
    return (
      <div className="itineraries">
        <h1>List of Itineraries</h1>
  
        {Array.isArray(itineraries) ? (
          itineraries.map((itinerary) => (
            <Itinerary key={itinerary.id} title={itinerary.title} description={itinerary.description} />
          ))
        ) : (
          <p>No itineraries available.</p> 
        )}
      </div>
    );
  };
  

const LoggedoutHome = ()=>{
    return (
        <div className="home container">
            <h1>Welcome to Itinerary Planner Page</h1>
            <Link to='/signup' className="btn btn-primary">Get Started</Link>
        </div>
        )
        }


const HomePage =()=>{

    const [ logged ] = useAuth();

    return (
        <div>
       { logged ?<LoggedinHome /> :<LoggedoutHome />}
        </div>
           )

}

export default HomePage;