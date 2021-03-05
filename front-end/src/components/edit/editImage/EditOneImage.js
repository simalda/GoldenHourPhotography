import React from "react";

import * as proxy from "../../../JS/proxy";
import history from "../../../JS/history";
import Image from "../../../JS/Image";
import "./editImage.css";
import { Fragment } from "react";
import ImageHandler from "../../../JS/ImageHandler";

class EditOneImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesToUpdate: [],
    };
  }

  createImageTypeOptions() {
    const options = [];
    this.props.imageTypes.map((type, index) => {
      if (type === this.props.image.imageType) {
        options.push(
          <option value={type} selected key={index}>
            {type}
          </option>
        );
      } else {
        options.push(
          <option value={type} key={index}>
            {type}
          </option>
        );
      }
    });
    return options;
  }

  createImageLocations() {
    const options = [];
    this.props.locationList.map((location, index) => {
      if (location.name === this.props.image.location) {
        options.push(
          <option value={location.name} selected key={index}>
            {location.name}
          </option>
        );
      } else {
        options.push(
          <option value={location.name} key={index}>
            {location.name}
          </option>
        );
      }
    });
    return options;
  }

  createEventTypes() {
    const options = [];
    this.props.eventTypes.map((type, index) => {
      if (type === this.props.image.eventType) {
        options.push(
          <option value={type} selected key={index}>
            {type}
          </option>
        );
      } else {
        options.push(
          <option value={type} key={index}>
            {type}
          </option>
        );
      }
    });
    return options;
  }

  updateListImagesToResaveimageType(e) {
    const image = new Image(
      this.props.image.name,
      e.options[e.options.selectedIndex].value,
      this.props.image.eventType,
      this.props.image.location
    );
    this.props.editOneImage(image);
  }

  updateListImagesToResaveEventType(e) {
    const image = new Image(
      this.props.image.name,
      this.props.image.imageType,
      e.options[e.options.selectedIndex].value,
      this.props.image.location
    );
    this.props.editOneImage(image);
  }

  updateListImagesToResaveLocation(e) {
    const image = new Image(
      this.props.image.name,
      this.props.image.imageType,
      this.props.image.eventType,
      e.options[e.options.selectedIndex].value
    );
    this.props.editOneImage(image);
  }

  deleteImage(image) {
    proxy.deleteImage(image).then(
      (loginResponse) => {
        console.log(loginResponse);
        alert("Deleted");
        history.push("/appManager");
        this.props.reloadApp();
      },
      (result) => {
        console.log(result);
        alert(" Not Saved :" + result);
        // history.push("/appManager");
        this.props.reloadApp();
      }
    );
  }

  // sendToUpdate(e) {
  //   e.preventDefault();
  //   const imHandler = new ImageHandler();
  //   imHandler.updateImages(imagesToUpdate);
  //  this.props.reloadApp();
  // }

  render() {
    const ImageTypeOptions = this.createImageTypeOptions();
    const ImageLocation = this.createImageLocations();
    // const LocationsTypes = this.createLocationTypes();
    const EventTypes = this.createEventTypes();
    // const LocationName = this.createLocationName();
    return (
      <Fragment>
        {/* <form onSubmit={(event) => this.sendToUpdate(event)}> */}
        <div className="editImageDiv">
          <img
            className="editImage"
            src={this.props.path}
            key={this.props.index}
          ></img>
          <div className="inputImageManagment">{this.props.image.name}</div>
          <select
            name="imageType"
            id="imType"
            className="selectImageManagment"
            onChange={(event) =>
              this.updateListImagesToResaveimageType(event.currentTarget)
            }
          >
            {ImageTypeOptions}
          </select>
          <select
            name="eventType"
            id="eventType"
            className="selectImageManagment"
            onChange={(event) =>
              this.updateListImagesToResaveEventType(event.currentTarget)
            }
          >
            event
            {EventTypes}
          </select>
          <select
            name="locationName"
            id="location"
            className="selectImageManagment"
            onChange={(event) =>
              this.updateListImagesToResaveLocation(event.currentTarget)
            }
          >
            {ImageLocation}
          </select>
          <button
            className="button"
            onClick={() => this.props.editImages()}
            style={{ width: "10vw" }}
          >
            שמירה
          </button>
          <button
            className="button"
            onClick={() => this.deleteImage(this.props.image)}
            style={{ width: "10vw" }}
          >
            מחיקה
          </button>
        </div>
        {/* </form> */}
      </Fragment>
    );
  }
}

export default EditOneImage;
