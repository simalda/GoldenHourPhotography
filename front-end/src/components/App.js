import React, { Component } from "react";

import { Route } from "react-router-dom";
import history from "../JS/history";
import { Router, Switch } from "react-router";

import NavBar from "./NavBar";
import Footer from "./Footer";
import MainPage from "./MainPage";
import Map from "./Map";
import M from "./M";
import MyCalendar from "./MyCalendar";
import Location from "./Location";
import D3images from "./D3images";
import AdminLogin from "./AdminLogin";
import OrderDetails from "./OrderDetails";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: "",
      loginSucssess: 0,
    };
  }

  render() {
    return (
      <Router history={history}>
        <NavBar />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <MainPage {...props} data={this.state} />}
          />
          {/* <Route path="/admin" data={this.state} component={AdminLogin} /> */}
          <Route
            path="/admin"
            Switch
            render={(props) => <AdminLogin {...props} data={this.state} />}
          />
          <Route path="/map" component={D3images} />
          <Route path="/location/calendar" component={MyCalendar} />
          <Route path="/location" component={Location} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;
