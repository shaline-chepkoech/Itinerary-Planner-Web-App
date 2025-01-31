import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import React from 'react'
import ReactDOM from 'react-dom';
import NavBar from './Navbar';
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import HomePage from './Home';
import LoginPage from './Login';
import SignUpPage from './SignUp';

import CreateItinerary from './CreateItinerary';

import Dropdown from './Dropdown';


const App =()=>{

    return (
        <Router>    
        <div className ="container">
           <NavBar/>
           <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dropdown" element={<Dropdown />} />
            <Route path="/create-itinerary" element={<CreateItinerary />} />
           </Routes>
        </div>
        </Router>
    )
}



ReactDOM.render(<App/>, document.getElementById('root'));