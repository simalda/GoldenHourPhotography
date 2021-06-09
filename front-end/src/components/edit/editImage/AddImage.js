import React from "react";

import history from "../../../JS/history";

import * as selectoptions from "../../../JS/getOptions";
import Image from "../../../JS/Image";
import ImageHandler from "../../../JS/ImageHandler";
import { convertDateToDateArrayDDMMYYYY } from "../../../JS/dateManipulations";

import classes from "./editImage.module.scss";
import Translator from "../../../JS/Translator";
class OrdersCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: null,
      imageType: "",
      imageLocation: "",
      imageViewType: "",
      bannerApearence: false,
      isNameInputDisabled: false,
    };
  }
  back() {
    history.goBack();
  }

  onUploadImage(event) {
    var str = event.target.value;
    var res = str.split("\\");
    const files = event.target.files;
    const formData = new FormData();
    formData.append("file", files[0]);
    this.setState({
      name: res[res.length - 1],
      image: event.target.value,
      isNameInputDisabled: true,
      file: formData,
    });
  }

  changeName(event) {
    this.setState({ name: event.target.value });
  }
  changeImageType(event) {
    this.setState({ imageType: event.target.value });
  }
  changeImageLocation(event) {
    this.setState({ imageLocation: event.target.value });
  }
  changeImageViewType(event) {
    this.setState({ imageViewType: event.target.value });
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
      this.state.name;
    const newFile = this.state.file;
    newFile.append("name", nameOfImageToSendToDB);
    const translator = new Translator();

    const image = new Image(
      nameOfImageToSendToDB,
      translator.translateToEnglish(this.state.imageType),
      translator.translateToEnglish(this.state.imageViewType),
      this.props.location.name
    );
    let imHandler = new ImageHandler();
    imHandler.saveFile(newFile).then(
      (loginResponse) => {
        console.log(loginResponse);
        imHandler.addNewImage(image).then(
          (loginResponse) => {
            console.log(loginResponse);
            alert("Saved");
            this.props
              .reloadApp("/editOneLocation")
              .then(() => history.push("/editOneLocation"));
            // history.push("/editOneLocation");
          },
          (result) => {
            console.log(result);
            alert(
              " Not Saved returned with code:" +
                result.status +
                result.statusText
            );
            this.props.reloadApp();
            history.push("/editOneLocation");
          }
        );
      },
      (result) => {
        console.log(result);
        alert(
          " Not Saved returned with code:" + result.status + result.statusText
        );
      }
    );
  }
  render() {
    const translator = new Translator();
    const ImageTypeOptions = selectoptions.getOptions(
      translator.translateArray(this.props.imageTypes)
    );
    const ImageLocationsOptions = selectoptions.getOptionsWithCurrent(
      this.props.imageLocations,
      this.props.location.name
    );
    const EventTypesOptions = selectoptions.getOptions(
      translator.translateArray(this.props.eventTypes)
    );
    if (this.state.isNameInputDisabled) {
      document.getElementById("name").disabled = true;
    }
    return (
      <div className="popup" style={{ paddingTop: "0vh" }}>
        <form onSubmit={(event) => this.mySubmitHandler(event)}>
          <h1>{this.props.dictionary["Feel the fields"]} </h1>
          <input
            type="file"
            id="input"
            multiple
            onChange={(event) => this.onUploadImage(event)}
          ></input>
          <p className={classes.par}>
            :{this.props.dictionary["Name of image"]}
          </p>
          <input
            id="name"
            className={classes.inputImageManagment}
            type="text"
            value={this.state.name}
            onChange={(event) => this.changeName(event)}
          />
          <div>{this.state.name}</div>
          <p className={classes.par}>:{this.props.dictionary["Image type"]}</p>
          <select
            name="imageType"
            id="imType"
            className={classes.selectImageManagment}
            onChange={(event) => this.changeImageType(event)}
          >
            {ImageTypeOptions}
          </select>
          <p className={classes.par}>
            :{this.props.dictionary["Image location"]}
          </p>
          <select
            name="location"
            id="imLoc"
            className={classes.selectImageManagment}
            onChange={(event) => this.changeImageLocation(event)}
          >
            {ImageLocationsOptions}
          </select>
          <p className={classes.par}>:{this.props.dictionary["Event type"]}</p>
          <select
            name="imViewType"
            id="imViewType"
            className={classes.selectImageManagment}
            onChange={(event) => this.changeImageViewType(event)}
          >
            {EventTypesOptions}
          </select>

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

export default OrdersCalendar;
