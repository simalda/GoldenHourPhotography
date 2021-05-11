import React from "react";

import Location from "../../../JS/Location";
import LocationHandler from "../../../JS/LocationHandler";
import * as selectoptions from "../../../JS/getOptions";

import history from "../../../JS/history";

import classes from "./locationEditor.module.scss";

class AddLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      latitude: 35,
      longtitude: 32,
      type: null,
      description: "",
      image: null,
    };
  }
  mySubmitHandler(event) {
    event.preventDefault();

    let locHandler = new LocationHandler();
    if (!this.state.image.length) {
      alert("Please add at least one image");
    } else {
      const newLocation = new Location(
        this.state.name,
        this.state.type,
        this.state.latitude,
        this.state.longtitude,
        this.state.description,
        [],
        [this.state.image]
      );
      locHandler.addNewLocation(newLocation).then(
        (loginResponse) => {
          console.log(loginResponse);
          alert("Saved");
          this.props.reloadApp();
          history.push("/editOneLocation");
        },
        (result) => {
          console.log(result);
          alert(" Not Saved :" + result);
        }
      );
    }
  }

  changeName(event) {
    this.setState({ name: event.target.value });
  }

  changeLocationType(event) {
    this.setState({ type: event.target.value });
  }
  changeDescription(event) {
    this.setState({ description: event.target.value });
  }
  onUploadImage(event) {
    var str = event.target.value;
    var res = str.split("\\");
    this.setState({
      image: res[res.length - 1],
    });
  }

  back() {
    history.goBack();
  }

  render() {
    const LocationTypeOptions = selectoptions.getOptions(
      this.props.locationTypes
    );

    return (
      <div className="popup" style={{ color: "white", paddingTop: "0vh" }}>
        <form onSubmit={(event) => this.mySubmitHandler(event)}>
          <h1>Feel the fields </h1>

          <p className={classes.par}>Name of location:</p>
          <input
            id="name"
            className={classes.inputImageManagment}
            type="text"
            value={this.state.name}
            onChange={(event) => this.changeName(event)}
          />
          <div>{this.state.name}</div>
          <p className={classes.par}>Location type:</p>
          <select
            name="locationType"
            id="locType"
            className={classes.selectImageManagment}
            onChange={(event) => this.changeLocationType(event)}
          >
            {LocationTypeOptions}
          </select>
          <p className={classes.par}>Latitude</p>
          <p className={classes.par}>{this.state.latitude}</p>
          <p className={classes.par}>Longtitude</p>
          <p className={classes.par}>{this.state.longtitude}</p>

          <p className={classes.par}>Description</p>
          <input
            id="name"
            className={classes.inputImageManagment}
            type="text"
            value={this.state.description}
            onChange={(event) => this.changeDescription(event)}
          />
          <p className={classes.par}>Name of location:</p>
          <input
            type="file"
            id="input"
            multiple
            onChange={(event) => this.onUploadImage(event)}
          ></input>

          <div>
            <button className="button" type="submit">
              {this.props.dictionary["save"]}
            </button>
          </div>
        </form>
        <button className="button" onClick={() => this.back()}>
          {this.props.dictionary["back"]}
        </button>
      </div>
    );
  }
}

export default AddLocation;
