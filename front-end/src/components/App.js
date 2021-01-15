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
import GaleryManager from "./AppManager";
import AddImage from "./AddImage";
import EditImage from "./EditImage";
import EditLocation from "./EditLocation";
import OrdersManager from "./OrdersManager";
import EditCalendar from "./EditCalendar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: "",
      loginSucssess: 0,
      imageTypes: [],
      imageLocations: ["les", "kishon", "deserd", "city"],
      eventTypes: [],
      imageList: [],
      ordersList: [],
      order: {
        name: "",
        mail: "",
        date: "",
        time: "",
        location: "קישון",
      },
    };
  }

  componentDidMount() {
    this.getAllImageTypes();
    this.getAllEventTypes();
    this.getAllImages();
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

  getAllImageTypes() {
    proxy.getAllImageTypes().then((types) => {
      console.log(types);
      this.setState({
        imageTypes: types,
      });
    });
  }

  getAllEventTypes() {
    proxy.getAllEventTypes().then((types) => {
      console.log(types);
      this.setState({
        eventTypes: types,
      });
    });
  }

  getAllImages() {
    proxy.getAllImages().then((images) => {
      console.log(images);
      this.setState({
        imageList: images,
      });
    });
  }

  deleteImage(event, name) {
    proxy.deleteImage(name);
    history.push("/appManager/editImage");
    event.preventDefault();
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
          <Route
            path="/location/calendar"
            render={(props) => (
              <OrdersCalendar
                {...props}
                updateOrder={(date, time) => this.updateOrder(date, time)}
              />
            )}
          />
          <Route
            path="/location"
            render={(props) => (
              <Location
                {...props}
                updateOrder={(date, time) => this.updateOrder(date, time)}
              />
            )}
          />
          <Route path="/endPage" component={EndPage} />
          <Route
            path="/orderDetails"
            render={(props) => (
              <OrderDetails {...props} order={this.state.order} />
            )}
          />
          {/* <Route path="/appManager/addImage" component={AddImage} /> */}
          <Route
            path="/appManager/addImage"
            render={(props) => (
              <AddImage
                {...props}
                imageTypes={this.state.imageTypes}
                imageLocations={this.state.imageLocations}
                eventTypes={this.state.eventTypes}
                imageList={this.state.imageList}
              />
            )}
          />
          <Route
            path="/appManager/editImage"
            render={(props) => (
              <EditImage
                {...props}
                imageTypes={this.state.imageTypes}
                imageLocations={this.state.imageLocations}
                eventTypes={this.state.eventTypes}
                imageList={this.state.imageList}
                deleteImage={(event, name) => this.deleteImage(event, name)}
              />
            )}
          />
          <Route path="/appManager" component={GaleryManager} />
          <Route
            path="/orders"
            render={(props) => (
              <OrdersManager
                {...props}
                // imageTypes={this.state.imageTypes}
                // imageLocations={this.state.imageLocations}
                // eventTypes={this.state.eventTypes}
                // imageList={this.state.imageList}
                // deleteImage={(event, name) => this.deleteImage(event, name)}
              />
            )}
          />
          <Route
            path="/editLocations"
            render={(props) => (
              <EditLocation
                {...props}
                // imageTypes={this.state.imageTypes}
                // imageLocations={this.state.imageLocations}
                // eventTypes={this.state.eventTypes}
                // imageList={this.state.imageList}
                // deleteImage={(event, name) => this.deleteImage(event, name)}
              />
            )}
          />
          <Route
            path="/editCalendar"
            render={(props) => (
              <EditCalendar
                {...props}
                // imageTypes={this.state.imageTypes}
                // imageLocations={this.state.imageLocations}
                // eventTypes={this.state.eventTypes}
                // imageList={this.state.imageList}
                // deleteImage={(event, name) => this.deleteImage(event, name)}
              />
            )}
          />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;
