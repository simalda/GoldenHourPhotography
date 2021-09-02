import React from "react";

import Location from "../../../JS/Location";
import * as selectoptions from "../../../JS/getOptions";

import history from "../../../JS/history";

import { convertDateToDateArrayDDMMYYYY } from "../../../JS/dateManipulations";
import classes from "./locationEditor.module.scss";
import ImageHandler from "../../../JS/ImageHandler";
import Image from "../../../JS/Image";
class AddLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.locationName,
      nameInEnglish: "",
      latitude: this.props.latlng.lat,
      longitude: this.props.latlng.lng,
    };
  }
  mySubmitHandler(event) {
    event.preventDefault();
    const shortDdateArray = convertDateToDateArrayDDMMYYYY(
      new Date(Date.now())
    );
    const nameOfImageToSendToDB =
      shortDdateArray[0] +
      "_" +
      shortDdateArray[1] +
      "_" +
      shortDdateArray[2] +
      "_" +
      this.state.imageName;
    const newFile = this.state.imageFile;
    newFile.append("name", nameOfImageToSendToDB);
    const newImage = new Image(
      null,
      nameOfImageToSendToDB,
      "sphere",
      this.state.type,
      this.state.name
    );
    if (!this.state.imageName.length) {
      alert("Please add at least one image");
    } else {
      const newLocation = new Location(
        this.state.name,
        this.state.type,
        this.state.latitude,
        this.state.longitude,
        this.state.description,
        [newImage],
        []
      );
      const imHandler = new ImageHandler();
      imHandler.saveFile(newFile);
      this.props.addNewLocation(newLocation);
    }
  }

  changeName(event) {
    this.setState({ name: event.target.value });
  }

  changeEnglishName(event) {
    this.setState({ nameInEnglish: event.target.value });
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
    const files = event.target.files;
    const formData = new FormData();
    formData.append("file", files[0]);
    this.setState({
      imageName: res[res.length - 1],
      imageFile: formData,
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
      <div className="popup">
        <form onSubmit={(event) => this.mySubmitHandler(event)}>
          <h1>Feel the fields </h1>

          <p className={classes.par}>Name of location:</p>
          <input
            id="name"
            className={classes.inputImageManagment}
            type="text"
            value={this.props.locationName}
            onChange={(event) => this.changeName(event)}
          />
          <p className={classes.par}>Name of location in English:</p>
          <input
            id="englishName"
            className={classes.inputImageManagment}
            type="text"
            value={this.state.nameInEnglish}
            onChange={(event) => this.changeEnglishName(event)}
          />
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
          <p className={classes.par}>longitude</p>
          <p className={classes.par}>{this.state.longitude}</p>

          <p className={classes.par}>Description</p>
          <input
            id="name"
            className={classes.inputImageManagment}
            type="text"
            value={this.state.description}
            onChange={(event) => this.changeDescription(event)}
          />
          <p className={classes.par}>Upload SPHERE image:</p>
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
