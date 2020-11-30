import React, {Component} from 'react';

import { Route } from "react-router-dom";
import history from "../JS/history";
import { Router } from "react-router";

import NavBar from "./NavBar";
import Footer from "./Footer";
import MainPage from "./MainPage";
import Map from "./Map";
import M from "./M";
import MyCalendar from "./MyCalendar";

class App extends Component{
    render(){
        return (
             
              <Router history={history}>
                <NavBar />
                <Route exact path="/" component={MainPage} />
                <Route   path="/map" component={M} />
                <Route path="/calendar" component={MyCalendar}/>
                <Footer />
              </Router>
             
          );
    }
}

export default App;