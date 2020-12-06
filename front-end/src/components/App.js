import React, { Component } from "react";

import { Route } from "react-router-dom";
import history from "../JS/history";
import { Router, Switch } from "react-router";

import NavBar from "./NavBar";
import Footer from "./Footer";
import MainPage from "./MainPage";
import Map from "./Map";
import OrdersCalendar from "./OrdersCalendar";
import Location from "./Location";
import AdminLogin from "./AdminLogin";
import EndPage from "./EndPage";
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
          <Route path="/locations" component={Map} />
          {/* <Route path="/location" component={D3images} /> */}
          <Route path="/location/calendar" component={OrdersCalendar} />
          <Route path="/location" component={Location} />
          <Route path="/endPage" component={EndPage} />
          <Route path="/orderDetails" component={OrderDetails} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;
