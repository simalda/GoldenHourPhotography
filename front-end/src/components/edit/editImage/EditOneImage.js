import React from "react";

import * as proxy from "../../../JS/proxy";
import history from "../../../JS/history";
import Image from "../../../JS/Image";
import { Fragment } from "react";
import * as selectoptions from "../../../JS/getOptions";

import classes from "./editImage.module.scss";
class EditOneImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.image.copy(),
    };
  }

  // createImageTypeOptions() {
  //   const options = [];
  //   this.props.imageTypes.map((type, index) => {
  //     if (type === this.props.image.imageType) {
  //       options.push(
  //         <option value={type} selected key={index}>
  //           {type}
  //         </option>
  //       );
  //     } else {
  //       options.push(
  //         <option value={type} key={index}>
  //           {type}
  //         </option>
  //       );
  //     }
  //   });
  //   return options;
  // }

  // createImageLocations() {
  //   const options = [];
  //   this.props.locationTypes.map((location, index) => {
  //     if (location.name === this.props.image.location) {
  //       options.push(
  //         <option value={location.name} selected key={index}>
  //           {location.name}
  //         </option>
  //       );
  //     } else {
  //       options.push(
  //         <option value={location.name} key={index}>
  //           {location.name}
  //         </option>
  //       );
  //     }
  //   });
  //   return options;
  // }

  // createEventTypes() {
  //   const options = [];
  //   this.props.eventTypes.map((type, index) => {
  //     if (type === this.props.image.eventType) {
  //       options.push(
  //         <option value={type} selected key={index}>
  //           {type}
  //         </option>
  //       );
  //     } else {
  //       options.push(
  //         <option value={type} key={index}>
  //           {type}
  //         </option>
  //       );
  //     }
  //   });
  //   return options;
  // }

  ChangeImageType(event) {
    this.setState((state) => {
      //state.image.imageType = event.target.value;
      return { image: { ...state.image, imageType: event.target.value } };
      //return { image: state.image };
    });
    //this.setState({ name: event.target.value });
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

  render() {
    const ImageTypeOptions = selectoptions.getOptionsWithCurrent(
      this.props.imageTypes,
      this.state.image.imageType
    );
    const LocationOptions = selectoptions.getOptionsWithCurrent(
      this.props.diffLocations,
      this.state.image.location
    );
    const EventTypes = selectoptions.getOptionsWithCurrent(
      this.props.eventTypes,
      this.state.image.eventType
    );
    return (
      <Fragment>
        <div className={classes.editImageDiv}>
          <img
            className={classes.editImage}
            src={this.props.path}
            key={this.props.index}
          ></img>
          <div className={classes.inputImageManagment}>
            {this.props.image.name}
          </div>
          <select
            name="imageType"
            id="imType"
            className={classes.selectImageManagment}
            onChange={(event) =>
              this.updateListImagesToResaveimageType(event.currentTarget)
            }
          >
            {ImageTypeOptions}
          </select>
          <select
            name="eventType"
            id="eventType"
            className={classes.selectImageManagment}
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
            className={classes.selectImageManagment}
            onChange={(event) =>
              this.updateListImagesToResaveLocation(event.currentTarget)
            }
          >
            {LocationOptions}
          </select>
          <button
            className="button"
            onClick={() => this.props.editImages()}
            style={{ width: "10vw" }}
          >
            {this.props.dictionary["save"]}
          </button>
          <button
            className="button"
            onClick={() => this.deleteImage(this.props.image)}
            style={{ width: "10vw" }}
          >
            {this.props.dictionary["delete"]}
          </button>
        </div>
      </Fragment>
    );
  }
}

export default EditOneImage;
