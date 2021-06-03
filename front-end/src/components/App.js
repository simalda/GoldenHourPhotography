import React, { Component } from "react";

import { Route } from "react-router-dom";
import history from "../JS/history";
import { Router, Switch } from "react-router";
import * as proxy from "../JS/proxy";

import AboutUs from "./navBar/aboutUs/AboutUs";
import AdminLogin from "./AdminLogin";
import Footer from "./Footer";
import Galery from "./navBar/galery/Galery";
import LocationJSX from "./LocationJSX";
import Map from "./map/Map";
import MainPage from "./mainPage/MainPage";
import NavBar from "./navBar/navBarItself/NavBar";
import EndPage from "./finalPage/EndPage";
import OrderDetails from "./OrderDetails";
import GaleryManager from "./edit/AppManager";
import AddImage from "./edit/editImage/AddImage";
import EditImage from "./edit/editImage/EditImage";
import EditLocation from "./edit/locationsEditor/EditLocations";
import EditOneLocation from "./edit/locationsEditor/EditOneLocation";
import EditLocationTypes from "./edit/EditLocationTypes";
import OrdersManager from "./OrdersManager";
import EditCalendar from "./edit/editCalendar/EditCalendar";
import TimeUnitHandler from "../JS/TimeUnitHandler";
import LocationHandler from "../JS/LocationHandler";
import Location from "../JS/Location";
import Translator from "../JS/Translator";
import Image from "../JS/Image";
import QuestionsAnswers from "./navBar/questionAnswers/QuestionsAnswers";
import AddLocation from "./edit/locationsEditor/AddLocation";
import EditSphereImageConnections from "./edit/locationsEditor/EditSphereImageConnections";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloaded: false,
      admin: "",
      loginSucssess: 0,
      imageTypes: [],
      locationTypes: [],
      diffLocations: [],
      eventTypes: [],
      imageList: [],
      ordersList: [],
      locationsInfo: [],
      locationDescription: {},
      date: new Date(),
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
    this.reloadApp();
  }
  reloadApp() {
    this.getLanguage();
    this.getAllImageTypes();
    this.getAllEventTypes();
    this.getAllImages();
    this.getAllAvalableDates();
    this.getLocationsInfo();
    this.getLocationTypes();
    this.getAllLocations();
  }
  getLanguage() {
    const translator = new Translator();
    const dictionary = translator.getDictionary();
    this.setState({
      dictionary: dictionary,
    });
  }

  handleAdminLogin(user, psw) {
    console.log("handleAdminLog");
    proxy.checkUser(user, psw).then((loginResponse) => {
      if (loginResponse.status === 200) {
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
      const imageList = images[0].map(
        (image) =>
          new Image(
            image.name,
            image.imageType,
            image.eventType,
            image.location,
            image.path
          )
      );
      this.setState({
        imageList: imageList,
      });
    });
  }

  getLocationsInfo() {
    let locationHandler = new LocationHandler();
    locationHandler.getAllLocationsInfo().then((locations) => {
      console.log("locaciot Info");
      console.log(locations);
      const newLocations = locations.map((location) =>
        Location.deserializeToLocationObject(location)
      );
      this.setState({
        locationsInfo: newLocations,
      });
    });
  }

  getAllLocations() {
    let locationHandler = new LocationHandler();
    locationHandler.getAllLocations().then((locations) => {
      console.log("All locations");
      console.log(locations);
      this.setState({
        diffLocations: locations,
        isloaded: true,
      });
    });
  }

  getLocationTypes() {
    let locationHandler = new LocationHandler();
    locationHandler.getLocationTypes().then((types) => {
      console.log("All locations types");
      console.log(types);
      this.setState({
        locationTypes: types,
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

  locationClicked(location) {
    this.setState({
      locationDescription: location,
    });
    history.push("/location");
  }
  updateOrderState(order) {
    this.setState({
      order: order,
    });
  }

  editSpecificLocation(location) {
    console.log(location);
    this.setState({
      locationDescription: location,
    });
    history.push("/editOneLocation");
  }

  addLocation(locationName, latlng) {
    this.setState({
      locationName: locationName,
      latlng: latlng,
    });
    history.push("/addLocation");
  }

  editPhotoSphereImageConnections(image) {
    console.log(image);
    this.setState({
      image: image,
    });
    history.push("/editSphereImageConnections");
  }
  addNewLocation(location) {
    let locHandler = new LocationHandler();
    locHandler.addNewLocation(location).then(
      (loginResponse) => {
        console.log(loginResponse);
        alert("Saved");
        this.setState({
          locationDescription: location,
        });
        this.reloadApp();
        history.push("/editOneLocation");
      },
      (result) => {
        console.log(result);
        alert(" Not Saved :" + result);
      }
    );
  }
  render() {
    if (!this.state.isloaded) {
      return <span>wait....</span>;
    }
    return (
      <Router history={history}>
        <NavBar />
        <div className="frame" id="frame">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <MainPage
                  {...props}
                  admin={this.state.admin}
                  imageList={this.state.imageList}
                  dictionary={this.state.dictionary}
                />
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
                  dictionary={this.state.dictionary}
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
                  dictionary={this.state.dictionary}
                />
              )}
            />
            <Route
              path="/location"
              render={(props) => (
                <LocationJSX
                  {...props}
                  admin={this.state.admin}
                  updateOrder={(date, time, hebrewDay, locationDescription) =>
                    this.updateOrder(date, time, hebrewDay, locationDescription)
                  }
                  calendar={this.state.calendar}
                  locationDescription={this.state.locationDescription}
                  dictionary={this.state.dictionary}
                />
              )}
            />

            <Route
              path="/endPage"
              render={() => (
                <EndPage
                  locationDescription={this.state.locationDescription}
                  dictionary={this.state.dictionary}
                  order={this.state.order}
                />
              )}
            />
            <Route
              path="/orderDetails"
              render={(props) => (
                <OrderDetails
                  {...props}
                  order={this.state.order}
                  eventTypes={this.state.eventTypes}
                  locationDescription={this.state.locationDescription}
                  dictionary={this.state.dictionary}
                  updateOrderState={(order) => this.updateOrderState(order)}
                />
              )}
            />

            <Route
              path="/appManager/addImage"
              render={(props) => (
                <AddImage
                  {...props}
                  imageTypes={this.state.imageTypes}
                  imageLocations={this.state.diffLocations}
                  eventTypes={this.state.eventTypes}
                  imageList={this.state.imageList}
                  locationTypes={this.state.locationTypes}
                  location={this.state.locationDescription}
                  reloadApp={() => this.reloadApp()}
                  dictionary={this.state.dictionary}
                />
              )}
            />
            <Route
              path="/appManager/editImage"
              render={(props) => (
                <EditImage
                  {...props}
                  imageTypes={this.state.imageTypes}
                  imageLocations={this.state.diffLocations}
                  eventTypes={this.state.eventTypes}
                  imageList={this.state.imageList}
                  locationTypes={this.state.locationTypes}
                  deleteImage={(event, name) => this.deleteImage(event, name)}
                  reloadApp={() => this.reloadApp()}
                  dictionary={this.state.dictionary}
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
                  imageLocations={this.state.diffLocations}
                  eventTypes={this.state.eventTypes}
                  imageList={this.state.imageList}
                />
              )}
            />

            <Route path="/appManager" component={GaleryManager} />
            <Route
              path="/orders"
              render={(props) => <OrdersManager {...props} />}
            />
            <Route
              path="/editLocations"
              render={(props) => (
                <EditLocation
                  {...props}
                  locationTypes={this.state.locationTypes}
                  locationsInfo={this.state.locationsInfo}
                  editSpecificLocation={(location) =>
                    this.editSpecificLocation(location)
                  }
                  dictionary={this.state.dictionary}
                />
              )}
            />
            <Route
              path="/addLocationFromMap"
              render={(props) => (
                <Map
                  {...props}
                  admin={this.state.admin}
                  imageTypes={this.state.imageTypes}
                  imageLocations={this.state.diffLocations}
                  eventTypes={this.state.eventTypes}
                  imageList={this.state.imageList}
                  locationTypes={this.state.locationTypes}
                  locationsInfo={this.state.locationsInfo}
                  dictionary={this.state.dictionary}
                  addLocation={(locationType, latlng) =>
                    this.addLocation(locationType, latlng)
                  }
                />
              )}
            />
            <Route
              path="/addLocation"
              render={(props) => (
                <AddLocation
                  {...props}
                  admin={this.state.admin}
                  imageTypes={this.state.imageTypes}
                  imageLocations={this.state.diffLocations}
                  eventTypes={this.state.eventTypes}
                  locationTypes={this.state.locationTypes}
                  locationsInfo={this.state.locationsInfo}
                  dictionary={this.state.dictionary}
                  locationName={this.state.locationName}
                  latlng={this.state.latlng}
                  addNewLocation={(location) => this.addNewLocation(location)}
                  reloadApp={() => this.reloadApp()}
                />
              )}
            />
            <Route
              path="/editOneLocation"
              render={(props) => (
                <EditOneLocation
                  {...props}
                  admin={this.state.admin}
                  imageTypes={this.state.imageTypes}
                  eventTypes={this.state.eventTypes}
                  locationTypes={this.state.locationTypes}
                  locationsInfo={this.state.locationsInfo}
                  dictionary={this.state.dictionary}
                  reloadApp={() => this.reloadApp()}
                  location={this.state.locationDescription}
                  diffLocations={this.state.diffLocations}
                  // AddLocation={(type) => this.AddLocation(type)}
                  editPhotoSphereImageConnections={(image) =>
                    this.editPhotoSphereImageConnections(image)
                  }
                />
              )}
            />
            <Route
              path="/editLocationTypes"
              render={(props) => (
                <EditLocationTypes
                  {...props}
                  admin={this.state.admin}
                  locationTypes={this.state.locationTypes}
                  dictionary={this.state.dictionary}
                  reloadApp={() => this.reloadApp()}
                />
              )}
            />
            <Route
              path="/editSphereImageConnections"
              render={(props) => (
                <EditSphereImageConnections
                  {...props}
                  admin={this.state.admin}
                  dictionary={this.state.dictionary}
                  reloadApp={() => this.reloadApp()}
                  image={this.state.image}
                  locationDescription={this.state.locationDescription}
                />
              )}
            />
            <Route
              path="/editCalendar"
              render={(props) => (
                <EditCalendar
                  {...props}
                  locationsInfo={this.state.locationsInfo}
                  eventTypes={this.state.eventTypes}
                  date={this.state.date}
                  timeSlotList={this.state.timeSlotList}
                  dictionary={this.state.dictionary}
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
