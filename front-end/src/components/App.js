import React, { Component } from "react";

import { Route } from "react-router-dom";
import history from "../JS/history";
import { Router, Switch } from "react-router";
import * as proxy from "../JS/proxy";

import NavBar from "./NavBar";
import Footer from "./Footer";
import MainPage from "./MainPage";
import Map from "./Map";
import OrdersCalendar from "./OrdersCalendar";
import Location from "./Location";
import AdminLogin from "./AdminLogin";
import EndPage from "./EndPage";
import OrderDetails from "./OrderDetails";
import GaleryManager from "./GaleryManager";
import AddImage from "./AddImage";
import EditImage from "./EditImage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: "",
      loginSucssess: 0,
      testNumber: 8,
      imageList: [],
      order: {
        name: "",
        mail: "",
        date: "",
        time: "",
        location: "קישון",
      },
    };
  }
  handleAdminLogin(user, psw) {
    proxy.checkUser(user, psw).then((loginResponse) => {
      if (loginResponse) {
        console.log(loginResponse);
        history.push("/");
        this.setState({ admin: user, loginSucssess: 1 });
      } else {
        this.setState({
          loginSucssess: -1,
        });
      }
    });
  }

  updateOrder(date, time) {
    this.setState((currentstate) => ({
      order: { ...currentstate.order, date, time },
    }));
  }

  render() {
    return (
      <Router history={history}>
        <NavBar />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <MainPage {...props} admin={this.state.admin} />}
          />
          <Route
            path="/admin"
            Switch
            render={(props) => (
              <AdminLogin
                {...props}
                testNumber={this.state.testNumber}
                loginSucssess={this.state.loginSucssess}
                handleAdminLogin={(user, psw) =>
                  this.handleAdminLogin(user, psw)
                }
                test={(a, b) => this.test(a, b)}
              />
            )}
          />
          <Route path="/locations" component={Map} />
          {/* <Route path="/location" component={D3images} /> */}
          <Route
            path="/location/calendar"
            render={(props) => (
              <OrdersCalendar
                {...props}
                updateOrder={(date, time) => this.updateOrder(date, time)}
              />
            )}
          />
          <Route path="/location" component={Location} />
          <Route path="/endPage" component={EndPage} />
          <Route
            path="/orderDetails"
            render={(props) => (
              <OrderDetails {...props} order={this.state.order} />
            )}
          />
          <Route path="/galeryManager/addImage" component={AddImage} />
          <Route path="/galeryManager/editImage" component={EditImage} />
          <Route path="/galeryManager" component={GaleryManager} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;
