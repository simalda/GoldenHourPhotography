import React, { Component } from "react";

import { Route } from "react-router-dom";
import history from "../JS/history";
import { Router, Switch } from "react-router";
import * as proxy from "../JS/proxy";

import NavBar from "./navBar/NavBar";
import Footer from "./Footer";
import AboutUs from "./navBar/AboutUs";
import Galery from "./navBar/Galery";
import QuestionsAnswers from "./navBar/QuestionsAnswers";
import MainPage from "./MainPage";
import Map from "./map/Map";
// import OrdersCalendar from "./ordersCalendar/OrdersCalendar";
import Location from "./Location";
import AdminLogin from "./AdminLogin";
import EndPage from "./EndPage";
import OrderDetails from "./OrderDetails";
import GaleryManager from "./edit/AppManager";
import AddImage from "./edit/editImage/AddImage";
import EditImage from "./edit/editImage/EditImage";
import EditLocation from "./edit/EditLocation";
import OrdersManager from "./OrdersManager";
import EditCalendar from "./edit/editCalendar/EditCalendar";
import TimeUnitHandler from "../JS/TimeUnitHandler";
import * as dateManager from "../JS/dateManipulations";
import LocationHandler from "../JS/locationHandler";
import Translator from "../JS/Translator";
// import LocationsEditor from "../locationsEditor/LocationsEditor";

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
      locationsInfo: [],
      locationDescription: {},
      date: new Date(),
      order: {
        name: "",
        mail: "",
        date: "",
        time: "",
        hebrewDay: "",
        location: "",
      },
      calendar: {
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      },
      timeSlotList: [],
      openDatesForOrder: [],
      footerPositionClass: "",
    };
  }

  componentDidMount() {
    this.getLanguage();
    this.getAllImageTypes();
    this.getAllEventTypes();
    this.getAllImages();
    this.getAllAvalableDates();
    this.getLocationsInfo();
    // this.getAllOpenDatesMonth();
    // this.getOpenTimeUnitsForWeek();
  }
  getLanguage() {
    const translator = new Translator();
    const dictionary = translator.getDictionary();
    this.setState({
      dictionary: dictionary,
    });
  }
  // componentDidUpdate() {
  //   if (
  //     (document.getElementById("frame") &&
  //       document.getElementById("frame").clientHeight < window.innerHeight) ||
  //     document.getElementById("imap")
  //   ) {
  //     this.setState({
  //       footerPositionClass: "fixed",
  //     });
  //   }
  // }
  checkFooterPosition() {}
  handleAdminLogin(user, psw) {
    console.log("handleAdminLog");
    proxy.checkUser(user, psw).then((loginResponse) => {
      if (loginResponse.result) {
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
  returnToLogin() {
    this.setState({
      loginSucssess: 0,
      admin: "",
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

  getLocationsInfo() {
    let locationHandler = new LocationHandler();
    locationHandler.getAllLocationsInfo().then((locations) => {
      console.log(locations);
      this.setState({
        locationsInfo: locations,
      });
    });
  }

  deleteImage(event, name) {
    proxy.deleteImage(name);
    history.push("/appManager/editImage");
    event.preventDefault();
  }

  updateOrder(date, time, hebrewDay, locationDescription) {
    this.setState((currentstate) => ({
      order: { ...currentstate.order, date, time, hebrewDay },
      locationDescription: locationDescription,
    }));
  }
  getAllAvalableDates() {
    let tuHandler = new TimeUnitHandler();
    tuHandler.getTimeSlots().then((slotList) => {
      console.log(slotList);
      this.setState({
        timeSlotList: slotList,
      });
    });
  }
  getOpenTimeUnitsForWeek() {
    let date = new Date();
    let week = dateManager.getWeekBorders(date);
    let tuHandler = new TimeUnitHandler();
    tuHandler
      .getOpenTimeUnitsForWeek(week.startDate, week.endDate)
      .then((openSlots) => {
        this.setState({
          openDatesForOrder: openSlots,
        });
      });

    // let tsManager = new TimeSlotManager();
    // return tsManager.getOpenTimeSlotsForMonth(month).then((openSlots) => {
    //   this.setState({
    //     openDatesForOrder: tsManager.slotList,
    //   });
    // });
  }
  locationClicked(location) {
    this.setState({
      locationDescription: location,
    });
    history.push("/location");
  }

  render() {
    return (
      <Router history={history}>
        <NavBar />
        <div className="frame" id="frame">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <MainPage {...props} admin={this.state.admin} />
              )}
            />
            <Route
              path="/admin"
              Switch
              render={(props) => (
                <AdminLogin
                  {...props}
                  loginSucssess={this.state.loginSucssess}
                  handleAdminLogin={(user, psw) =>
                    this.handleAdminLogin(user, psw)
                  }
                  returnToLogin={() => this.returnToLogin()}
                />
              )}
            />
            <Route
              path="/AboutUs"
              render={() => (
                <div style={{ paddingTop: "9vh" }}>
                  <AboutUs />
                </div>
              )}
            />
            <Route path="/galery" render={() => <Galery />} />
            <Route path="/questionsAnswers" component={QuestionsAnswers} />
            <Route
              path="/locations"
              render={(props) => (
                <Map
                  {...props}
                  admin={this.state.admin}
                  locationsInfo={this.state.locationsInfo}
                  locationClicked={(location) => this.locationClicked(location)}
                />
              )}
            />
            <Route
              path="/location"
              render={(props) => (
                <Location
                  {...props}
                  updateOrder={(date, time, hebrewDay, locationDescription) =>
                    this.updateOrder(date, time, hebrewDay, locationDescription)
                  }
                  calendar={this.state.calendar}
                  locationDescription={this.state.locationDescription}
                  // openDatesForOrder={this.state.openDatesForOrder}
                />
              )}
            />
            <Route path="/endPage" component={EndPage} />
            <Route
              path="/orderDetails"
              render={(props) => (
                <OrderDetails
                  {...props}
                  order={this.state.order}
                  eventTypes={this.state.eventTypes}
                  locationDescription={this.state.locationDescription}
                  dictionary={this.state.dictionary}
                />
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
            <Route
              path="/appManager/locationsEditor"
              render={(props) => (
                <Map
                  {...props}
                  admin={this.state.admin}
                  imageTypes={this.state.imageTypes}
                  imageLocations={this.state.imageLocations}
                  eventTypes={this.state.eventTypes}
                  imageList={this.state.imageList}
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
                  date={this.state.date}
                  timeSlotList={this.state.timeSlotList}
                />
              )}
            />
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
