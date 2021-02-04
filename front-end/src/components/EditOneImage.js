import React from "react";

import importAll from "../JS/imageManager";
import Button from "./Button";
import * as proxy from "../JS/proxy";
import history from "../JS/history";
import TimeSlotJSX from "./TimeSlotJSX";
import Image from "../JS/Image";

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
            {type}{" "}
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
    this.props.imageLocations.map((type, index) => {
      if (type === this.props.image.location) {
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

  createLocationTypes() {
    const options = [];
    this.props.LocationTypes.map((type, index) => {
      if (type === this.props.image.locationType) {
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

  createEventTypes() {
    const options = [];
    this.props.eventTypes.map((type, index) => {
      if (type === this.props.image.eventType) {
        options.push(
          <option value={type} selected key={index}>
            {type}{" "}
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
      },
      (result) => {
        console.log(result);
        alert(" Not Saved :" + result);
        history.push("/appManager");
      }
    );
  }

  sendToUpdate() {
    proxy.updateImages(imagesToUpdate);
  }

  render() {
    const ImageTypeOptions = this.createImageTypeOptions();
    const ImageLocations = this.createImageLocations();
    // const LocationsTypes = this.createLocationTypes()
    const EventTypes = this.createEventTypes();
    return (
      <form onSubmit={(event) => this.sendToUpdate(event)}>
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
            id="imType"
            className="selectImageManagment"
            onChange={(event) =>
              this.updateListImagesToResaveEventType(event.currentTarget)
            }
          >
            event
            {EventTypes}
          </select>
          <select
            name="imageLocation"
            id="imType"
            className="selectImageManagment"
            onChange={(event) =>
              this.updateListImagesToResaveLocation(event.currentTarget)
            }
          >
            {LocationsTypes}
          </select>
          <select
            name="imageLocation"
            id="imType"
            className="selectImageManagment"
            onChange={(event) =>
              this.updateListImagesToResaveLocation(event.currentTarget)
            }
          >
            {ImageLocations}
          </select>

          <Button
            buttonText={"שמירה"}
            clicked={() => this.props.editImages()}
          />
          <Button
            buttonText={"מחיקה"}
            clicked={() => this.deleteImage(this.props.image)}
          />
        </div>
      </form>
    );
  }
}

export default EditOneImage;
