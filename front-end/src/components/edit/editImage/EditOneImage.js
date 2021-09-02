import React from "react";

import * as proxy from "../../../JS/proxy";
import history from "../../../JS/history";
import Image from "../../../JS/Image";
import { Fragment } from "react";
import * as selectoptions from "../../../JS/getOptions";

import classes from "./editImage.module.scss";
import ImageHandler from "../../../JS/ImageHandler";
import Translator from "../../../JS/Translator";
class EditOneImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.image.copy(),
    };
  }

  changeImageType(e) {
    this.setState((state) => {
      return {
        image: {
          ...state.image,
          imageType: e.options[e.options.selectedIndex].value,
        },
      };
    });
  }

  changeEventType(e) {
    this.setState((state) => {
      return {
        image: {
          ...state.image,
          eventType: e.options[e.options.selectedIndex].value,
        },
      };
    });
  }

  changeLocation(e) {
    this.setState((state) => {
      return {
        image: {
          ...state.image,
          location: e.options[e.options.selectedIndex].value,
        },
      };
    });
  }

  updateListImagesToResaveLocation(e) {
    const image = new Image(
      this.props.image.id,
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
        this.props.reloadApp();
      }
    );
  }

  saveImage() {
    const imHandler = new ImageHandler();
    imHandler.updateImage(this.state.image);
    this.props.reloadApp();
  }
  render() {
    const translator = new Translator();
    const ImageTypeOptions = selectoptions.getOptionsWithCurrent(
      translator.translateArray(this.props.imageTypes),
      translator.translate(this.state.image.imageType)
    );
    const LocationOptions = selectoptions.getOptionsWithCurrent(
      this.props.diffLocations,
      this.state.image.location
    );
    const EventTypes = selectoptions.getOptionsWithCurrent(
      translator.translateArray(this.props.eventTypes),
      translator.translate(this.state.image.eventType)
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
            onChange={(event) => this.changeImageType(event.currentTarget)}
          >
            {ImageTypeOptions}
          </select>
          <select
            name="eventType"
            id="eventType"
            className={classes.selectImageManagment}
            onChange={(event) => this.changeEventType(event.currentTarget)}
          >
            event
            {EventTypes}
          </select>
          <select
            name="locationName"
            id="location"
            className={classes.selectImageManagment}
            onChange={(event) => this.changeLocation(event.currentTarget)}
          >
            {LocationOptions}
          </select>
          <button
            className="button"
            onClick={() => this.saveImage()}
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
