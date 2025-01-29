import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import React from 'react'
import ReactDOM from 'react-dom';
import NavBar from './components/Navbar';
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import HomePage from './components/Home';
import LoginPage from './components/Login';
import SignUpPage from './components/SignUp';
import CreateItinerary from './components/CreateItinerary';
import Dropdown from './components/Dropdown';


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