import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import React from 'react'
import ReactDOM from 'react-dom';
import NavBar from './components/Navbar';
import {
    BrowserRouter as Router,
    Switch,
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
           <Switch>
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route exact path="/dropdown" component={Dropdown} />
            <Route exact path="/create-itinerary" component={CreateItinerary} />
           </Switch>
        </div>
        </Router>
    )
}



ReactDOM.render(<App/>, document.getElementById('root'));